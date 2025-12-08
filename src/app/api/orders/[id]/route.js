// app/api/orders/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ==========================
// EMAIL SETTINGS
// ==========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error("Email error:", err.message);
  }
}

// ====================================================
// 🟦 POST — Upload Payment Image
// ====================================================
export async function POST(req, context) {
  const params = await context.params;
  const id = params?.id;

  try {
    const formData = await req.formData();
    const file = formData.get("paymentImage");

    if (!file) {
      return NextResponse.json(
        { error: "Image file required" },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save locally
    const uploadDir = path.join(process.cwd(), "public", "payments");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/payments/${fileName}`;
    console.log(id);

    // Update DB
    const updated = await prisma.order.update({
      where: { id },
      data: {
        paymentImage: imageUrl,
        paymentStatus: "submitted",
      },
    });

    return NextResponse.json({ success: true, imageUrl, updated });
  } catch (err) {
    console.error("Payment upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload payment image" },
      { status: 500 }
    );
  }
}

// ====================================================
// 🟩 PATCH — Update order fields (Already existing)
// ====================================================
export async function PATCH(req, context) {
  const params = await context.params;
  const id = params?.id;

  if (!id) {
    return NextResponse.json(
      { error: "Missing order id in URL" },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const allowedUpdates = {
    approval: body.approval,
    paymentStatus: body.paymentStatus,
    completion: body.completion,
  };

  Object.keys(allowedUpdates).forEach(
    (key) => allowedUpdates[key] === undefined && delete allowedUpdates[key]
  );

  try {
    const updated = await prisma.order.update({
      where: { id },
      data: allowedUpdates,
    });

    const customerEmail = updated.customerEmail;
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    // 🚫 Block paymentStatus update unless paymentImage exists
    if (body.paymentStatus && !existingOrder.paymentImage) {
      return NextResponse.json(
        { error: "Cannot update payment status without a payment image." },
        { status: 400 }
      );
    }

    if (customerEmail) {
      if (body.approval === "approved") {
        await sendEmail(
          customerEmail,
          "Order Approved",
          `Your order #${updated.id} has been approved.`
        );
      }
      if (body.paymentStatus === "paid") {
        await sendEmail(
          customerEmail,
          "Payment Received",
          `Payment for your order #${updated.id} has been received.`
        );
      }
      if (body.completion === "started") {
        await sendEmail(
          customerEmail,
          "Order Started",
          `Work has started on your order #${updated.id}.`
        );
      }
      if (body.completion === "completed") {
        await sendEmail(
          customerEmail,
          "Order Completed",
          `Your order #${updated.id} has been completed.`
        );
      }
    }

    return NextResponse.json({ success: true, updated });
  } catch (err) {
    console.error("Order update error:", err);

    const message =
      err?.code === "P2025"
        ? "Order not found"
        : err?.message || "Failed to update order";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
