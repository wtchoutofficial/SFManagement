import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, handle, countryCode, phone, goals } = await request.json();

    if (!name || !handle) {
      return NextResponse.json(
        { error: "Name and handle are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "SF Management <onboarding@resend.dev>",
      to: "Thomas@sfmanagement.eu",
      subject: `New Creator Application: ${name}`,
      html: `
        <h2>New Creator Application</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Handle</td><td style="padding:8px;">${handle}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${countryCode} ${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Goals</td><td style="padding:8px;">${goals || "Not provided"}</td></tr>
        </table>
        <br>
        <p style="color:#666;font-size:12px;">Sent from sfmanagement.eu application form</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application email error:", error);
    return NextResponse.json(
      { error: "Failed to send application" },
      { status: 500 }
    );
  }
}
