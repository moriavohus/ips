import { NextResponse } from "next/server";
import { isAuthenticated } from "../verify";

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deployHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

  if (!deployHookUrl) {
    return NextResponse.json({
      success: true,
      message: "Changes committed to GitHub. Netlify will deploy automatically if GitHub auto-publishing is enabled.",
    });
  }

  const res = await fetch(deployHookUrl, { method: "POST" });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to trigger Netlify deploy hook" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Netlify deploy triggered successfully",
  });
}
