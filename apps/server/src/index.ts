import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ res: "Hello Hono! This text is sent by monolog-server" });
});

export default app;
