"use server";
import nodemailer from "nodemailer";

export async function sendmail({ to, name, subject, body }) {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Verify transporter connection
    await transporter.verify();
  } catch (error) {
    return { success: false, error: "Transporter verification failed" };
  }

  try {
    // Send email
    await transporter.sendMail({
      from: `${name} <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      html: body,
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Email sending failed" };
  }
}
