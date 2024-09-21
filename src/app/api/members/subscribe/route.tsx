import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookie = cookies();
  const token = cookie.get("auth-token");

  if (!token) return NextResponse.json("fail", { status: 403 });

  const fetching = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/members/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!fetching.ok) return NextResponse.json("fail", { status: 500 });
  return NextResponse.json(true, { status: 200 });
}
