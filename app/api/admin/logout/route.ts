import { NextResponse } from "next/server";

export const POST = async () => {
  const response = NextResponse.json({ success: true, message: "Admin logout successful!" });
  response.cookies.set("auth", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });
  return response;
};
