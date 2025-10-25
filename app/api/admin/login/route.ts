import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import adminModel from "@/db/schemas/adminModel";
import { connectDB } from "@/db/db";
import { SignJWT } from "jose";

export const runtime = "nodejs";

type LoginBodyType = {
  email: string;
  password: string;
};

export const POST = async (req: Request) => {
  const { email, password }: LoginBodyType = await req.json();
  await connectDB();

  const admin = await adminModel.findOne({ email });
  if (!admin)
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );

  try {
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({ role: "admin", email: admin.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);
    const response = NextResponse.json({
      success: true,
      message: "Admin login successful!",
    });
    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
};
