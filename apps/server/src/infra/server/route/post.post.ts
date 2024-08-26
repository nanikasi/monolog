import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { createPost } from "../../../usecase/create-post";
import type { Bindings, VariablesType } from "../entrypoint";
import { authMiddleware } from "../middleware/auth-middleware";

const schema = createRoute({
  method: "post",
  path: "/api/post",
  request: {
    query: z.object({
      authorId: z.string().openapi({
        example: "",
        description: "author ID",
      }),
      content: z.string().min(1).openapi({
        example: "",
        description: "content",
      }),
    }),
  },
  middleware: [authMiddleware],
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            id: z.string().min(1).openapi({
              example: "",
              description: "ID",
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
  Variables: VariablesType;
}>();

route.openapi(schema, async (c) => {
  const authorId = c.req.valid("query").authorId;
  const content = c.req.valid("query").content;
  const di = c.get("diContainer");

  const output = await createPost(
    {
      userRepository: di.get("UserRepository"),
      postRepository: di.get("PostRepository"),
    },
    { authorId: authorId, content: content },
  );
  return c.json({
    id: output.id,
  });
});

export default route;
