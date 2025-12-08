// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { phoneNumber, password } = await req.json();

    // 1. Check user
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Phone number not found" },
        { status: 400 }
      );
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 }
      );
    }

    // 3. Sign JWT
    const token = await new SignJWT({
      id: user.id,
      name: user.name,
      role: user.role || "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // 4. Return response with token in cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role || "user",
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
