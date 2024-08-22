import { revokeSession } from "@hono/oidc-auth";
import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Bindings, VariablesType } from "../entrypoint";

const schema = createRoute({
  method: "get",
  path: "/api/auth/logout",
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
  await revokeSession(c);
  return c.json({}, 200);
});

export default route;
