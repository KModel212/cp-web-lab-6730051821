import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3000";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "";

  const url = new URL("/greet", BACKEND_URL);

  if (name) {
    url.searchParams.set("name", name);
  }

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Cannot connect to backend" },
      { status: 500 },
    );
  }
}