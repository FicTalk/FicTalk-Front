import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/profile") && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
