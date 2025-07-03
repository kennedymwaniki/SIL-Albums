import { db } from "@/db/db";
import { photos } from "@/db/schema";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

const photosRouter = new Hono();

photosRouter.get("/", async (c) => {
  const photos = await db.query.photos.findMany({
    with: { album: true },
  });
  return c.json(photos);
});

photosRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const photo = await db.query.photos.findFirst({
    where: eq(photos.id, id),
  });
  return c.json(photo);
});

photosRouter.post("/", async (c) => {
  const body = await c.req.json();
  const newPhoto = await db.insert(photos).values(body).returning();
  return c.json({ message: "Create a new photo", data: newPhoto });
});
photosRouter.patch("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const updatedPhoto = await db
    .update(photos)
    .set(body)
    .where(eq(photos.id, id))
    .returning();
  return c.json({ message: "Update photo with ID: " + id, data: updatedPhoto });
});
export default photosRouter;
