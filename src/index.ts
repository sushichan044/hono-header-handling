import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
const app = new Hono();

app.use(async (c, next) => {
  const sessionCookie = c.req.header("Cookie");
  if (!sessionCookie) {
    // This `append: true` destroys prepareHeaders.
    c.header("Set-Cookie", "hoge-session=hoge-session-value", { append: true });
  }

  await next();
});

// hono/cors uses c.res.headers.set() internally before executing route handler, so Context.#res will be initialized.
// https://github.com/honojs/hono/blob/5ca6c6ef867e022671b4c429c04d0ff89ed0c37c/src/middleware/cors/index.ts#L83-L91
app.use(cors());

app.get("/", (c) => {
  c.header("Content-Type", "text/html; charset=UTF-8");
  return c.body(
    "<html><head><meta charset='UTF-8'></head><body><h1>Hello World</h1></body></html>"
  );
});

serve({ fetch: app.fetch }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
