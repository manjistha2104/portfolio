import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("laravel_token")?.value;

  if (token) {
    await fetch(`${API_URL}/admin/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const response = NextResponse.json({ message: "Logged out successfully." });

  response.cookies.set("laravel_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });

  return response;
}