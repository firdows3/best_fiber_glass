// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
const prisma = new PrismaClient();

export async function PATCH(req, context) {
  const params = await context.params;
  const id = params?.id;
  console.log(id);

  try {
    const data = await req.formData();

    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description") || "";
    const existingImageUrl = data.get("imageUrl");

    let image = existingImageUrl || "";

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

    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, imageUrl: image },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Edit product error:", err);
    return NextResponse.json(
      { success: false, message: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  const params = await context.params;
  const id = params?.id;
  try {
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json(
      { success: false, message: "Delete failed" },
      { status: 500 }
    );
  }
}
