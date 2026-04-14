import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { isAuthenticated } from "../verify";

const PROJECT_DIR = path.resolve(process.cwd());

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return new Promise<NextResponse>((resolve) => {
    const cmd = `cd ${PROJECT_DIR} && npx next build 2>&1 && pm2 reload ips-middle-east 2>&1`;

    exec(cmd, { timeout: 120000, maxBuffer: 5 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        const output = stdout + "\n" + stderr;
        // Check if build succeeded but pm2 had a warning (still OK)
        if (output.includes("Generating static pages") && output.includes("✓")) {
          resolve(
            NextResponse.json({
              success: true,
              message: "Build completed with warnings",
              output: output.slice(-500),
            })
          );
          return;
        }
        resolve(
          NextResponse.json(
            {
              error: "Build failed",
              output: output.slice(-1000),
            },
            { status: 500 }
          )
        );
        return;
      }

      resolve(
        NextResponse.json({
          success: true,
          message: "Site rebuilt and deployed successfully",
          output: stdout.slice(-500),
        })
      );
    });
  });
}
