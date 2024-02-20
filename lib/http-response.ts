import { NextResponse } from "next/server";

export const ok = (data?: any) => {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};

export const created = (data: any) => {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
};

export const notFound = () => {
  return new NextResponse("Not Found", {
    status: 404,
  });
};

export const serverError = () => {
  return new NextResponse("An Error Happened", {
    status: 500,
  });
};
