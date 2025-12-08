import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: true,
      },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      orderCount: u.orders.length,
      createdAt: u.createdAt,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, phoneNumber, password } = await req.json();

    const exists = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Phone number already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        phoneNumber,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Registered successfully!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
