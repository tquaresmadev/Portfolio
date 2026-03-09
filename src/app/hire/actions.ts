"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: "tiagoquaresmadev@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return { success: true };
  } catch {
    return { error: "Failed to send email. Please try again later." };
  }
}
