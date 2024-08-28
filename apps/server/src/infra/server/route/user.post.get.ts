import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import type { Bindings } from "hono/types";
import { showUserPosts } from "../../../usecase/show-user-posts";
import type { VariablesType } from "../entrypoint";
import { authMiddleware } from "../middleware/auth-middleware";

const schema = createRoute({
  method: "get",
  path: "/api/user/{id}/posts",
  request: {
    params: z.object({
      id: z.string().openapi({
        example: "",
        description: "user id",
      }),
    }),
    query: z.object({
      start: z.string().optional().openapi({
        example: "",
        description: "start post id",
      }),
      limit: z.coerce.number().positive().safe().lte(50).optional(),
    }),
  },
  middleware: [authMiddleware],
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.array(
            z.object({
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
          ),
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
  const start = c.req.valid("query").start;
  const limit = c.req.valid("query").limit;
  const di = c.get("diContainer");

  const output = await showUserPosts(
    { postRepository: di.get("PostRepository") },
    { id, start, limit },
  );

  return c.json(
    output.map((o) => {
      return {
        id: o.id,
        content: o.content,
        authorId: o.authorId,
        createdAt: o.createdAt,
      };
    }),
  );
});

export default route;
