import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();
export const runtime = "nodejs";

export async function PATCH(req, context) {
  const params = await context.params;
  const id = params?.id;

  try {
    const data = await req.formData();

    const name = data.get("name");
    const price = data.get("price");
    const description = data.get("description") || "";
    const existingImageUrl = data.get("imageUrl");

    let imageUrl = existingImageUrl;

    const file = data.get("image");

    // ============================
    // If new image selected → upload to Cloudinary
    // ============================
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await cloudinary.uploader.upload(
        `data:${file.type};base64,${buffer.toString("base64")}`,
        {
          folder: "soothing-products",
          resource_type: "image",
        }
      );

      imageUrl = uploadRes.secure_url;

      // ============================
      // Remove previous image from Cloudinary
      // ============================
      if (existingImageUrl) {
        const publicId = existingImageUrl.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`soothing-products/${publicId}`);
      }
    }

    // ============================
    // Update database
    // ============================
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        imageUrl,
      },
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
