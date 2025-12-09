// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  try {
    const data = await req.formData();
    const id = params.id;

    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description") || "";

    let imageUrl = data.get("imageUrl"); // old URL
    const file = data.get("image"); // new uploaded file

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await cloudinary.uploader.upload(
        `data:image/jpg;base64,${buffer.toString("base64")}`,
        { folder: "soothing-products" }
      );

      imageUrl = uploadRes.secure_url;
    }

    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, imageUrl },
    });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Update product error:", err);
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
