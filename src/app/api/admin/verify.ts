import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ips_admin";
const SESSION_SECRET = process.env.SESSION_SECRET || "ips-admin-secret-key-change-in-production";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) return false;

  const parts = session.value.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts)) return false;

  const age = (Date.now() - ts) / 1000;
  if (age > SESSION_MAX_AGE || age < 0) return false;

  try {
    const expected = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(`${ADMIN_USERNAME}:${timestamp}`)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}
