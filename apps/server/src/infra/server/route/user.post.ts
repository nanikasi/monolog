import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { CreateUser } from "../../../usecase/create-user";
import type { DIContainer } from "../di-container";
import type { Bindings, DependencyTypes } from "../entrypoint";
import { authMiddleware } from "../middleware/auth-middleware";

const schema = createRoute({
  method: "post",
  path: "/api/user",
  request: {
    query: z.object({
      oauthID: z
        .string()
        .openapi({ example: "oauth ID", description: "oauth ID" }),
      name: z
        .string()
        .openapi({ example: "John Doe", description: "user name" }),
      bio: z
        .string()
        .openapi({ example: "I live in Japan", description: "biography" }),
    }),
  },
  middleware: [authMiddleware],
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
      description: "return response on success",
    },
  },
});

const route = new OpenAPIHono<{
  Bindings: Bindings;
  Variables: {
    diContainer: DIContainer<DependencyTypes>;
  };
}>();

route.openapi(schema, async (c) => {
  const oauthID = c.req.valid("query").oauthID;
  const name = c.req.valid("query").name;
  const bio = c.req.valid("query").bio;
  const di = c.get("diContainer");

  await CreateUser(
    { userRepository: di.get("UserRepository") },
    { oauthID, name, bio },
  );

  return c.json({});
});

export default route;
