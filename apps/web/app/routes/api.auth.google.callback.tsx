import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";

export const loader = ({ request, context }: LoaderFunctionArgs) => {
  const env = getEnv(context);
  return authenticator(env).authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
};
