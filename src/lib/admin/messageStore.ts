import fs from "fs/promises";
import path from "path";

const MESSAGES_DIR = path.join(process.cwd(), "messages");

type GithubContentResponse = {
  content?: string;
  encoding?: string;
  sha?: string;
  message?: string;
};

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) return null;

  return { token, repo, branch };
}

function messagePath(locale: string) {
  return `messages/${locale}.json`;
}

function localMessagePath(locale: string) {
  return path.join(MESSAGES_DIR, `${locale}.json`);
}

function encodeBase64(content: string) {
  return Buffer.from(content, "utf-8").toString("base64");
}

function decodeBase64(content: string) {
  return Buffer.from(content.replace(/\n/g, ""), "base64").toString("utf-8");
}

async function githubRequest<T>(url: string, init: RequestInit = {}): Promise<T> {
  const config = githubConfig();
  if (!config) throw new Error("GitHub content sync is not configured");

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...init.headers,
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const message = typeof data?.message === "string" ? data.message : "GitHub API request failed";
    throw new Error(message);
  }

  return data as T;
}

async function readGithubMessages(locale: string) {
  const config = githubConfig();
  if (!config) throw new Error("GitHub content sync is not configured");

  const filePath = messagePath(locale);
  const url = `https://api.github.com/repos/${config.repo}/contents/${filePath}?ref=${encodeURIComponent(config.branch)}`;
  const data = await githubRequest<GithubContentResponse>(url);

  if (!data.content || data.encoding !== "base64") {
    throw new Error(`Unable to read ${filePath} from GitHub`);
  }

  return JSON.parse(decodeBase64(data.content));
}

async function writeGithubMessages(locale: string, data: Record<string, unknown>, commitMessage: string) {
  const config = githubConfig();
  if (!config) throw new Error("GitHub content sync is not configured");

  const filePath = messagePath(locale);
  const url = `https://api.github.com/repos/${config.repo}/contents/${filePath}`;
  const current = await githubRequest<GithubContentResponse>(
    `${url}?ref=${encodeURIComponent(config.branch)}`
  );

  if (!current.sha) {
    throw new Error(`Unable to find current SHA for ${filePath}`);
  }

  await githubRequest(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encodeBase64(`${JSON.stringify(data, null, 2)}\n`),
      sha: current.sha,
      branch: config.branch,
    }),
  });
}

export function isGithubMessageStoreEnabled() {
  return Boolean(githubConfig());
}

export async function readMessages(locale: string) {
  if (isGithubMessageStoreEnabled()) {
    return readGithubMessages(locale);
  }

  const content = await fs.readFile(localMessagePath(locale), "utf-8");
  return JSON.parse(content);
}

export async function writeMessages(
  locale: string,
  data: Record<string, unknown>,
  commitMessage: string
) {
  if (isGithubMessageStoreEnabled()) {
    await writeGithubMessages(locale, data, commitMessage);
    return;
  }

  await fs.writeFile(localMessagePath(locale), `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}
