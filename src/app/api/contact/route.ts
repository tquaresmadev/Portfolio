import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";

const MAX_LENGTH = { name: 100, email: 200, subject: 150, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const text = (key: string) => (typeof data[key] === "string" ? (data[key] as string).trim() : "");

  if (text("company")) {
    return NextResponse.json({ success: true });
  }

  const name = oneLine(text("name"));
  const email = text("email");
  const subject = oneLine(text("subject"));
  const message = text("message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: { name, address: process.env.GMAIL_USER ?? "" },
      to: site.email,
      replyTo: { name, address: email },
      subject: `[Portfolio] ${subject || `Message from ${name}`}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Email send error:", msg);
    return NextResponse.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
  }
}
