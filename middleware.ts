import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("auth")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  try {
    const e = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    if (payload.role !== "admin") throw new Error("Unauthorized");
    return NextResponse.next();
  } catch (error) {
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: [
    "/((?!api/admin/login)api/admin/.*)",
  ],
};
