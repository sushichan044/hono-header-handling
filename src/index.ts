import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(async (c, next) => {
  const sessionCookie = c.req.header("Cookie");
  if (!sessionCookie) {
    c.header("Set-Cookie", "hoge-session=hoge-session-value", { append: true });
  }

  await next();
});

app.use(async (c, next) => {
  // c.header("X-Debug", "true") works! :thinking:
  c.res.headers.set("X-Debug", "true");

  await next();

  console.log("c.res.headers after c.body():");
  console.log(c.res.headers);
  console.log("-".repeat(100));
});

app.get("/", (c) => {
  c.header("Content-Type", "text/html");
  return c.body("<html><body><h1>Hello World</h1></body></html>");
});

serve({ fetch: app.fetch }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
