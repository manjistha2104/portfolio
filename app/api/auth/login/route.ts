import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.message || "Login failed.", errors: data?.errors },
      { status: response.status }
    );
  }

  const nextResponse = NextResponse.json(data);

  nextResponse.cookies.set("laravel_token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return nextResponse;
}