import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";
import type { Post } from "./$id";

export const loader = async ({
  params,
  request,
  context,
}: LoaderFunctionArgs) => {
  const env = getEnv(context);

  const url = new URL(request.url);
  const id = params.id;
  const limit = url.searchParams.get("limit");
  const start = url.searchParams.get("start");

  const user = await authenticator(env).isAuthenticated(request);
  if (!user) {
    return new Error("User not found");
  }

  const response = await fetch(
    `${context.cloudflare.env.SERVER_URL}/api/user/${id}/posts?start=${start}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  if (!response.ok) {
    return new Error("response not ok");
  }

  return (await response.json()) as Post[];
};
