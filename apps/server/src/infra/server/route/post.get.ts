import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Bindings } from "hono/types";
import { showPost } from "../../../usecase/show-post";
import type { VariablesType } from "../entrypoint";
import { signinRequired } from "../middleware/auth-middleware";

const schema = createRoute({
  method: "get",
  path: "/api/post/{id}",
  request: {
    params: z.object({
      id: z.string().openapi({
        example: "",
        description: "post ID",
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
            content: z
              .string()
              .openapi({ example: "hello", description: "content" }),
            authorId: z
              .string()
              .openapi({ example: "", description: "author ID" }),
            createdAt: z.string().openapi({
              description: "When this post was created",
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
  const id = c.req.valid("param").id;
  const di = c.get("diContainer");

  const output = await showPost(
    { postRepository: di.get("PostRepository") },
    { id },
  );
  return c.json({
    id: output.id,
    content: output.content,
    authorId: output.authorId,
    createdAt: output.createdAt,
  });
});

export default route;
