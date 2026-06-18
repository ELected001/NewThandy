import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "thandy_seo_admin";
const sessionTtlSeconds = 60 * 60 * 8;

const fallbackAdmin = {
  username: "thandy-admin-f5be",
  salt: "uem31vxGXHRNKnw62VwAYw",
  passwordHash: "Cyx77GXLEANQU_KdbGBHStKUKpcfaj64uz3eWUuOo-o",
  sessionTokenHash: "yvIORJVbTvZlZU3Ysfts1rvcvharunj4H0rkhO80_rg",
};

type AdminConfig =
  | {
      mode: "env";
      username: string;
      password: string;
      secret: string;
    }
  | {
      mode: "fallback";
      username: string;
      salt: string;
      passwordHash: string;
      sessionTokenHash: string;
    };

function hashSecret(value: string) {
  return createHash("sha256").update(value).digest("base64url");
}

function getAdminConfig(): AdminConfig | null {
  const username = process.env.SEO_ADMIN_USERNAME?.trim() || "";
  const password = process.env.SEO_ADMIN_PASSWORD?.trim() || "";
  const secret = process.env.SEO_ADMIN_SECRET?.trim() || password;

  if (username || password || process.env.SEO_ADMIN_SECRET) {
    if (!username || !password || !secret) {
      return null;
    }

    return {
      mode: "env",
      username,
      password,
      secret,
    };
  }

  return {
    mode: "fallback",
    ...fallbackAdmin,
  };
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createEnvSessionValue(secret: string) {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + sessionTtlSeconds * 1000,
    }),
  ).toString("base64url");

  return `env.${payload}.${sign(payload, secret)}`;
}

function createFallbackSessionValue(config: Extract<AdminConfig, { mode: "fallback" }>, password: string) {
  return `fallback.${hashSecret(`${config.salt}:session:${password}`)}`;
}

export function isSeoAdminConfigured() {
  return Boolean(getAdminConfig());
}

export function verifySeoAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();

  if (!config) {
    return false;
  }

  if (!safeEqual(username, config.username)) {
    return false;
  }

  if (config.mode === "env") {
    return safeEqual(password, config.password);
  }

  return safeEqual(hashSecret(`${config.salt}:${password}`), config.passwordHash);
}

export async function isSeoAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(cookieName)?.value;
  const config = getAdminConfig();

  if (!session || !config) {
    return false;
  }

  const [mode, payload, signature] = session.split(".");

  if (config.mode === "fallback") {
    return mode === "fallback" && Boolean(payload) && safeEqual(hashSecret(`${config.salt}:${payload}`), config.sessionTokenHash);
  }

  if (mode !== "env" || !payload || !signature || !safeEqual(signature, sign(payload, config.secret))) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: unknown;
    };

    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export async function createSeoAdminSession(password: string) {
  const cookieStore = await cookies();
  const config = getAdminConfig();

  if (!config) {
    return;
  }

  const value =
    config.mode === "env" ? createEnvSessionValue(config.secret) : createFallbackSessionValue(config, password);

  cookieStore.set(cookieName, value, {
    httpOnly: true,
    maxAge: sessionTtlSeconds,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSeoAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(cookieName);
}
