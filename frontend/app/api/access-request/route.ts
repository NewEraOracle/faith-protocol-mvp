import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/whitelist", request.url), 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const role = String(formData.get("role") || "");
  const wallet = String(formData.get("wallet") || "");
  const message = String(formData.get("message") || "");
  const website = String(formData.get("website") || "");

  if (website) {
    return NextResponse.redirect(new URL("/access-request-received", request.url), 303);
  }

  console.info("FAITH_ACCESS_REQUEST", {
    name,
    email,
    role,
    wallet,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.redirect(new URL("/access-request-received", request.url), 303);
}
