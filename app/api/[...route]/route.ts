import { Hono } from "hono";
import { handle } from "hono/vercel";
import photosRouter from "../(modules)/photos";
import usersRouter from "../(modules)/users";
import albumsRouter from "../(modules)/albums";

import { cors } from "hono/cors";
// export const runtime = "edge";

const app = new Hono().basePath("/api");
app.use(cors({ origin: "*" }));

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.route("/users", usersRouter);
app.route("/albums", albumsRouter);
app.route("/photos", photosRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
// export const UPDATE = handle(app);
