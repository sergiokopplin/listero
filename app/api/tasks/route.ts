import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const request = await fetch(`https://dummyjson.om/todos`);
    const result = await request.json();

    return new NextResponse(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
    });
  }
}
