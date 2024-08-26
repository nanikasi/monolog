import { createMiddleware } from "hono/factory";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const authMiddleware = createMiddleware(async (c, next) => {
  const bearer = await c.req.header("Authorization");
  if (!bearer) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const accessToken = bearer?.replace("Bearer ", "");

  const JWKS_URI = "https://www.googleapis.com/oauth2/v3/certs";
  const CLIENT_ID = c.env.CLIENT_ID;

  try {
    const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

    const { payload } = await jwtVerify(accessToken, JWKS, {
      issuer: "https://accounts.google.com",
      audience: CLIENT_ID,
    });
  } catch (error) {
    return c.text("ID Token verification failed", 400);
  }
  await next();
});
