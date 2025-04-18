import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(async (c, next) => {
  console.log("c.res.headers", c.res.headers);

  const sessionCookie = c.req.header("Cookie");
  if (!sessionCookie) {
    // This `append: true` destroys prepareHeaders.
    c.header("Set-Cookie", "hoge-session=hoge-session-value", { append: true });
  }

  await next();
});

app.use(async (c, next) => {
  c.header("X-Debug", "true");
  await next();
});

app.get("/", (c) => {
  c.header("Content-Type", "text/html");
  return c.body("<html><body><h1>Hello World</h1></body></html>");
});

serve({ fetch: app.fetch }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
