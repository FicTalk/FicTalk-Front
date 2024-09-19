import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");
  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/members/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json(await getData.json(), { status: 200 });
}
