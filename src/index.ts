import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(async (c, next) => {
  const sessionCookie = c.req.header("Cookie");
  if (!sessionCookie) {
    // This `append: true` destroys prepareHeaders.
    c.header("Set-Cookie", "hoge-session=hoge-session-value", { append: true });
  }

  await next();
});

app.get("/", (c) => {
  c.header("Content-Type", "text/html; charset=UTF-8");
  return c.body(
    "<html><head><meta charset='UTF-8'></head><body><h1>Hello World</h1></body></html>"
  );
});

serve({ fetch: app.fetch }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
