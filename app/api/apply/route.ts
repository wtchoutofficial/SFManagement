import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_COUNTRY_CODES = ["+47", "+46", "+45", "+358", "+354", "+44", "+1", "+49"];

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, handle, tiktok, countryCode, phone, goals } = body;

    // Validate required fields
    if (!name || !email || !handle) {
      return NextResponse.json(
        { error: "Name, email, and handle are required" },
        { status: 400 }
      );
    }

    // Validate types and lengths
    if (
      typeof name !== "string" || name.length > 200 ||
      typeof email !== "string" || email.length > 200 ||
      typeof handle !== "string" || handle.length > 200
    ) {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate optional fields
    if (tiktok && (typeof tiktok !== "string" || tiktok.length > 200)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    if (phone && (typeof phone !== "string" || phone.length > 20)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    if (goals && (typeof goals !== "string" || goals.length > 2000)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    if (countryCode && !VALID_COUNTRY_CODES.includes(countryCode)) {
      return NextResponse.json({ error: "Invalid country code" }, { status: 400 });
    }

    // Sanitize all values before inserting into HTML
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeHandle = escapeHtml(handle.trim());
    const safeTiktok = tiktok ? escapeHtml(tiktok.trim()) : "Not provided";
    const safeCountryCode = escapeHtml((countryCode || "+47").trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : "";
    const safeGoals = goals ? escapeHtml(goals.trim()) : "Not provided";

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "SF Management <noreply@sfmanagement.eu>",
      replyTo: email.trim(),
      to: "Thomas@sfmanagement.eu",
      subject: `New Creator Application: ${safeName}`,
      html: `
        <h2>New Creator Application</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${safeName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Instagram</td><td style="padding:8px;">${safeHandle}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">TikTok</td><td style="padding:8px;">${safeTiktok}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${safeCountryCode} ${safePhone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Goals</td><td style="padding:8px;">${safeGoals}</td></tr>
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
