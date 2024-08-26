import { createCookieSessionStorage } from "@remix-run/cloudflare";

export const sessionStorage = (env: Env) => {
  if (!env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not set");
  }

  return createCookieSessionStorage({
    cookie: {
      name: "auth_session",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      secrets: [env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
    },
  });
};
