"use server";

import { sendmail } from "@/utils/sendmail";
import { contactFormTemplate } from "@/utils/formTemplate";

export const sendContactEnquiry = async ({ name, email, phone, message }) => {
  const emailBody = contactFormTemplate({
    name,
    email,
    phone,
    message,
  });

  try {
    await sendmail({
      to: "refillystreetstyle@gmail.com",
      name: "Refilly",
      subject: "Contact Form Enquiry (Refilly )",
      body: emailBody,
    });
    await sendmail({
      to: email,
      name: "Refilly",
      subject: "Contact Form Enquiry (Refilly )",
      body: emailBody,
    });

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Failed to send email
  }
};
