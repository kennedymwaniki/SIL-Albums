import db from "@/db/db";
import { albums } from "./../../../db/schema";
import { Hono } from "hono";
// import { eq } from "drizzle-orm/sql/expressions/conditions";
import { eq } from "drizzle-orm";

const albumsRouter = new Hono();

albumsRouter.get("/", async (c) => {
  const albums = await db.query.albums.findMany({
    with: {
      photos: true,
    },
  });
  return c.json(albums);
});
albumsRouter.get("/:id", async (c) => {
  // Logic to fetch album by ID
  const id = Number(c.req.param("id"));
  const album = await db.query.albums.findFirst({
    where: eq(albums.id, id),
    with: {
      photos: true,
    },
  });
  return c.json(album);
});

albumsRouter.post("/", async (c) => {
  const body = await c.req.json();
  const newAlbum = await db.insert(albums).values(body).returning();
  return c.json({ message: "Create a new album", data: newAlbum });
});

albumsRouter.patch("/:id", async (c) => {
  // Logic to update an album
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const updatedAlbum = await db
    .update(albums)
    .set(body)
    .where(eq(albums.id, id))
    .returning();
  return c.json({ message: "Update album with ID: " + id, data: updatedAlbum });
});

export default albumsRouter;
