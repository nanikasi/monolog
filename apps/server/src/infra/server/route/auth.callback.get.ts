import { processOAuthCallback } from "@hono/oidc-auth";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Bindings, VariablesType } from "../entrypoint";

const schema = createRoute({
  method: "get",
  path: "/api/auth/callback",
  responses: {
    301: {
      description: "return response on success",
    },
  },
});

const route = new OpenAPIHono<{
  Bindings: Bindings;
  Variables: VariablesType;
}>();

route.openapi(schema, async (c) => {
  const response = await processOAuthCallback(c);
  const headers = new Headers(response.headers);
  headers.set("location", "http://localhost:5173");

  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });

  return newResponse;
});

export default route;
