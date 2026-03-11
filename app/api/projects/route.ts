import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("laravel_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/admin/projects`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("laravel_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
  }

  const formData = await request.formData();

  const response = await fetch(`${API_URL}/admin/projects`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}