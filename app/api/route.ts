import { connectDB } from "@/db/db";
import adminModel from "@/db/schemas/adminModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  return NextResponse.json({r: ""});
}