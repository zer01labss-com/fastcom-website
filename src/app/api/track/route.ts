import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingNo = searchParams.get("tracking_no");

  if (!trackingNo) {
    return NextResponse.json(
      { error: "Tracking number is required" },
      { status: 400 }
    );
  }

  try {
    const apiUrl = `https://admin.airwinch.in/api/tracking_api/get_tracking_data?api_company_id=47&customer_code=superadmin&tracking_no=${encodeURIComponent(
      trackingNo.trim()
    )}`;

    const res = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      // Avoid stale cache for real-time tracking
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Tracking service responded with status ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Tracking API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to connect to the tracking server. Please try again." },
      { status: 500 }
    );
  }
}

