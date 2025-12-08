// app/api/products/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error("Products fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();

    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description") || "";
    const existingImageUrl = data.get("imageUrl"); // from edit

    let image = existingImageUrl || "";

    // Handle uploaded file
    const file = data.get("image");

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `product_${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      image = `/uploads/${fileName}`;
    }

    if (!name || !price || !image) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl: image,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json(
      { success: false, message: "Create failed" },
      { status: 500 }
    );
  }
}
