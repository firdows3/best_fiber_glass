import cloudinary from "@/lib/cloudinary";
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
    const file = data.get("image"); // uploaded file

    if (!file) {
      return NextResponse.json(
        { success: false, message: "Image is required" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(
      `data:image/jpg;base64,${buffer.toString("base64")}`,
      { folder: "soothing-products" }
    );

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl: uploadRes.secure_url, // save cloudinary URL
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
