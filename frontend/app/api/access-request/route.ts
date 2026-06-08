import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/whitelist", request.url), 303);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const wallet = String(formData.get("wallet") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const website = String(formData.get("website") || "").trim();

  if (website) {
    return NextResponse.redirect(new URL("/access-request-received", request.url), 303);
  }

  const accessRequest = {
    name,
    email,
    role,
    wallet,
    message,
    receivedAt: new Date().toISOString(),
  };

  console.info("FAITH_ACCESS_REQUEST", accessRequest);

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "FAITH Access <contact@faithdefi.com>",
      to: "contact@faithdefi.com",
      replyTo: email || undefined,
      subject: "New FAITH Monetary Protocol Access Request",
      text: [
        "New FAITH Monetary Protocol Access Request",
        "",
        `Name: ${name || "N/A"}`,
        `Email: ${email || "N/A"}`,
        `Role: ${role || "N/A"}`,
        `Wallet: ${wallet || "N/A"}`,
        "",
        "Message:",
        message || "N/A",
        "",
        `Received at: ${accessRequest.receivedAt}`,
      ].join("\n"),
    });
  }

  return NextResponse.redirect(new URL("/access-request-received", request.url), 303);
}

