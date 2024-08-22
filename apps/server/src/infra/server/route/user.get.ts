import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { showUser } from "../../../usecase/show-user";
import type { DIContainer } from "../d1-container";
import type { Bindings, DependencyTypes } from "../entrypoint";
import { signinRequired } from "../middleware/auth-middleware";

const schema = createRoute({
  method: "get",
  path: "/api/user/{id}",
  request: {
    params: z.object({
      id: z.string().openapi({
        example: "",
        description: "user ID",
      }),
    }),
  },
  middleware: [signinRequired],
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().min(1).openapi({
              example: "",
              description: "ID",
            }),
            name: z
              .string()
              .openapi({ example: "John Doe", description: "user name" }),
            bio: z.string().openapi({
              example: "I live in Japan",
              description: "biography",
            }),
          }),
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
  const { id } = c.req.valid("param");
  const di = c.get("diContainer");

  const output = await showUser(
    { userRepository: di.get("UserRepository") },
    { id },
  );
  return c.json({
    id: output.id,
    name: output.name,
    bio: output.bio,
  });
});

export default route;
