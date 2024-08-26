import type { AppLoadContext } from "@remix-run/cloudflare";

export const getEnv = (context: AppLoadContext): Env => {
  let env: Env;
  try {
    env = process.env as unknown as Env;
  } catch {
    env = context.cloudflare.env as Env;
  }
  return env;
};
