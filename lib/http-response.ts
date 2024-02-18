import { NextResponse } from "next/server";

export const ok = (data: any) => {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "OK",
  });
};

export const serverError = () => {
  return new NextResponse("An Error Happened", {
    status: 500,
    statusText: "Error",
  });
};
