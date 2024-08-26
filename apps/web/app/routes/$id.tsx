import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import "dotenv/config";

import { json, redirect, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";

export const meta: MetaFunction = () => {
  return [
    { title: "みんなひとりごと" },
    {
      name: "description",
      content: "Welcome to monolog",
    },
  ];
};

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const env = getEnv(context);
  const user = await authenticator(env).isAuthenticated(request);
  if (!user) {
    return redirect("/");
  }
  const userResponse = await fetch(
    `${context.cloudflare.env.SERVER_URL}/api/user/${params.id}`,
    {
      method: "2GET",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  return json({ user: "hi" });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return <div>Name Hello</div>;
}
