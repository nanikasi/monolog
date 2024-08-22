import { getAuth } from "@hono/oidc-auth";
import { createMiddleware } from "hono/factory";

export const signinRequired = createMiddleware(async (c, next) => {
  const auth = await getAuth(c);
  if (!auth) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});
