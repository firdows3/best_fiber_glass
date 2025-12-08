import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // Expire immediately
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
