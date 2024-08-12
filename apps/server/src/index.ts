import {
  getAuth,
  oidcAuthMiddleware,
  processOAuthCallback,
  revokeSession,
} from "@hono/oidc-auth";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";

const app = new Hono();

const onlySignin = () => {
  return createMiddleware(async (c, next) => {
    const auth = await getAuth(c);
    if (!auth) {
      return c.text("Need Sign In!");
    }
    await next();
  });
};

app.get("/logout", async (c) => {
  await revokeSession(c);
  return c.text("You have been successfully logged out!");
});

app.get("/callback", async (c) => {
  return processOAuthCallback(c);
});

app.get("/noSignin", async (c) => {
  return c.text("You have been dont need to sign in!!");
});

app.use("/signIn", oidcAuthMiddleware());

app.use("*", onlySignin());

app.get("/", async (c) => {
  const auth = await getAuth(c);
  return c.text(`Hello <${auth?.email}>!${auth?.sub}`);
});

export default app;
