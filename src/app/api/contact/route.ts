import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, ContactFormData } from "@/lib/utils";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "IPS Middle East <onboarding@resend.dev>",
      to: "sanat@ipsinsulation.co.uk",
      subject: "New contact form submission — IPS Middle East",
      text: `Name: ${body.name}\nCompany: ${body.company}\nEmail: ${body.email}\nPhone: ${body.phone}\n\nMessage:\n${body.message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}