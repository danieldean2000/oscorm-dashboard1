import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    
    // Handle FormData
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const url = formData.get("url") as string;
      const method = (formData.get("method") as string) || "POST";

      if (!url) {
        return NextResponse.json({ success: false, message: "Missing target URL" }, { status: 400 });
      }

      // Create new FormData for backend request
      const backendFormData = new FormData();
      for (const [key, value] of formData.entries()) {
        if (key !== "url" && key !== "method") {
          backendFormData.append(key, value);
        }
      }

      const response = await fetch(url, {
        method,
        body: backendFormData,
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        return NextResponse.json(data, { status: response.status });
      } catch {
        return NextResponse.json(
          { success: false, message: "Backend did not return JSON", raw: text },
          { status: response.status }
        );
      }
    }

    // Handle JSON
    const { url, method = "POST", body, headers = {} } = await req.json();

    if (!url) {
      return NextResponse.json({ success: false, message: "Missing target URL" }, { status: 400 });
    }

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      return NextResponse.json(
        { success: false, message: "Backend did not return JSON", raw: text },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json({ success: false, message: "Missing target URL" }, { status: 400 });
    }

    const response = await fetch(url, { method: "GET" });
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: response.status });
    } catch {
      return NextResponse.json(
        { success: false, message: "Backend did not return JSON", raw: text },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
