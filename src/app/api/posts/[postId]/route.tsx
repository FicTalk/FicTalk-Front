import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const postId = await req.json();

  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json("succses", { status: 200 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const cookieStore = cookies();
  const authToken = cookieStore.get("auth-token");

  const getData = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/posts/37`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken?.value}`,
    },
    body: JSON.stringify(data),
  });

  if (!getData.ok) {
    return NextResponse.json(getData.statusText, { status: getData.status });
  }

  return NextResponse.json("success", { status: 200 });
}
