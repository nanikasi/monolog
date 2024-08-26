import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";

export async function action({ request, context }: ActionFunctionArgs) {
  const env = getEnv(context);
  return authenticator(env).logout(request, { redirectTo: "/" });
}
