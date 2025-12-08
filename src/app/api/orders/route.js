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
    const phoneNumber = data.get("customerPhone");
    const userId = data.get("userId");
    const productName = data.get("productName");
    const productPrice = data.get("productPrice");
    const customerName = data.get("customerName");
    const customerPhone = data.get("customerPhone");
    const customerEmail = data.get("customerEmail");
    const customerLocation = data.get("customerLocation");

    const productImageUrl = data.get("productImageUrl"); // from works
    let productImage = productImageUrl || "";

    // Check for uploaded file
    const file = data.get("productImageFile");

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `product_${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      productImage = `/uploads/${fileName}`;
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        productName,
        productPrice,
        customerName,
        customerPhone,
        customerEmail,
        customerLocation,
        productImage,
        approval: "pending",
        paymentStatus: "pending",
        completion: "toBeStarted",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
