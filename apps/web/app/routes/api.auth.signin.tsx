import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";
import initGoogleAuthenticator from "~/service/googleStrategy.server";

export const action = ({ request, context }: ActionFunctionArgs) => {
  const env = getEnv(context);
  initGoogleAuthenticator(context);
  return authenticator(env).authenticate("google", request);
};
