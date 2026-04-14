import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, ContactFormData } from "@/lib/utils";

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

    // TODO: Store in Sanity when configured
    // const sanityClient = createClient({...});
    // await sanityClient.create({ _type: 'contactSubmission', ...body });

    // TODO: Send email notification
    // await sendEmail({...});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
