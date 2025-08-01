import { db } from "@/db/db";
import { albums } from "@/db/schema";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

const albumsRouter = new Hono();

albumsRouter.get("/", async (c) => {
  const userId = c.req.query("userId");

  if (userId) {
    const userAlbums = await db.query.albums.findMany({
      where: eq(albums.userId, Number(userId)),
      with: {
        photos: true,
      },
    });
    return c.json(userAlbums);
  } else {
    const allAlbums = await db.query.albums.findMany({
      with: {
        photos: true,
      },
    });
    return c.json(allAlbums);
  }
});
albumsRouter.get("/:id", async (c) => {
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
  try {
    const body = await c.req.json();
    console.log("Received album creation request:", body);
    const newAlbum = await db.insert(albums).values(body).returning();
    console.log("Album created:", newAlbum);
    return c.json({ message: "Create a new album", data: newAlbum });
  } catch (error) {
    console.error("Error creating album:", error);
    return c.json(
      {
        error: "Failed to create album",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

albumsRouter.patch("/:id", async (c) => {
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
