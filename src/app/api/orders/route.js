import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error("Orders fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load orders" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const userId = data.get("userId");
    const productName = data.get("productName");
    const productPrice = data.get("productPrice");
    const customerName = data.get("customerName");
    const customerPhone = data.get("customerPhone");
    const customerEmail = data.get("customerEmail");
    const customerLocation = data.get("customerLocation");

    const productImageUrl = data.get("productImageUrl") || "";

    let productImage = productImageUrl;

    const file = data.get("productImageFile");

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload buffer to Cloudinary
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "my-products", // your folder name
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              resolve(result);
            }
          )
          .end(buffer);
      });

      productImage = uploadRes.secure_url; // final hosted URL
    }

    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        productName,
        productPrice,
        customerName,
        customerPhone,
        customerEmail,
        customerLocation,
        productImage, // Save Cloudinary URL here
        approval: "pending",
        paymentStatus: "pending",
        completion: "toBeStarted",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
