import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ips_admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "IPS@SecureAdmin2024!";
const SESSION_SECRET = process.env.SESSION_SECRET || "ips-admin-secret-key-change-in-production";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours in seconds

// Rate limiting: max 5 failed attempts per IP per 15 minutes
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry) return true;
  if (now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(ip);
    return true;
  }
  return entry.count < MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    entry.count++;
  }
}

function clearAttempts(ip: string): void {
  loginAttempts.delete(ip);
}

function generateToken(username: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`${username}:${timestamp}`)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

function verifyToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  // Check expiration
  const age = (Date.now() - ts) / 1000;
  if (age > SESSION_MAX_AGE || age < 0) return false;

  // Verify HMAC signature
  const expected = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(`${ADMIN_USERNAME}:${timestamp}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("cf-connecting-ip")
      || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      clearAttempts(ip);
      const token = generateToken(username);
      const cookieStore = await cookies();

      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value && verifyToken(session.value)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
