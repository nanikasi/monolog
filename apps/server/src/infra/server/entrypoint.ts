import { getAuth } from "@hono/oidc-auth";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import type { PostRepository } from "../../domain/repository/post-repository";
import type { UserRepository } from "../../domain/repository/user-repository";
import { MemoryPostRepositoryImpl } from "../repository/memory/post-repository-impl";
import { MemoryUserRepositoryImpl } from "../repository/memory/user-repository-impl";
import { DIContainer } from "./di-container";
import authCallbackGetRoute from "./route/auth.callback.get";
import authGetRoute from "./route/auth.get";
import authLogoutGet from "./route/auth.logout.get";
import postGetRoute from "./route/post.get";
import postPostRoute from "./route/post.post";
import userGetRoute from "./route/user.get";
import userPostRoute from "./route/user.post";

export type Bindings = {
  DB: D1Database;
  WEB_URL: string;
  OIDC_AUTH_SECRET: string;
};

export type VariablesType = {
  diContainer: DIContainer<DependencyTypes>;
};

export interface DependencyTypes {
  UserRepository: UserRepository;
  PostRepository: PostRepository;
}

const diContainer = new DIContainer<DependencyTypes>();
diContainer.register("UserRepository", MemoryUserRepositoryImpl);
diContainer.register("PostRepository", MemoryPostRepositoryImpl);

const app = new OpenAPIHono<{
  Bindings: Bindings;
  Variables: VariablesType;
}>();

app.use("*", async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.WEB_URL,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
    credentials: true,
  });

  await corsMiddleware(c, next);
});

app
  .doc("/schema", {
    openapi: "3.0.0",
    info: { version: "1.0.0", title: "monolog-server" },
  })
  .use("*", (c, next) => {
    c.set("diContainer", diContainer);
    return next();
  })
  .get("/ui", swaggerUI({ url: "schema" }))
  .route("/", authGetRoute)
  .route("/", authCallbackGetRoute)
  .route("/", authLogoutGet)
  .route("/", userPostRoute)
  .route("/", userGetRoute)
  .route("/", postPostRoute)
  .route("/", postGetRoute);

app.get("/", async (c) => {
  const auth = await getAuth(c);
  return c.text(auth?.sub ?? "hello");
});

app.get("/get", async (c) => {
  return c.json({ weburl: c.env.WEB_URL, key: c.env.OIDC_AUTH_SECRET });
});

export default app;
