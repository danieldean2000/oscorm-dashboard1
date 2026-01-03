import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Call your Hostinger backend
    const response = await fetch(
      "https://competent-shirley.72-61-78-56.plesk.page/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text); // parse JSON if backend returns JSON
      return NextResponse.json(data, { status: response.status });
    } catch {
      // Fallback if backend returns HTML or non-JSON
      return NextResponse.json(
        { success: false, message: "Backend did not return JSON", raw: text },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
