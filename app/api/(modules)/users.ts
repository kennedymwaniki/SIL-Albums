import db from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const usersRouter = new Hono();

usersRouter.get("/", async (c) => {
  const Users = await db.query.users.findMany({
    with: {
      albums: true,
    },
  });
  return c.json({ message: "Fetch all users", data: Users });
});

usersRouter.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const User = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      albums: true,
    },
  });
  if (!User) {
    return c.json({ message: "User not found" }, 404);
  }
  return c.json({ message: "Fetch user with ID: " + id, data: User });
});

usersRouter.post("/", async (c) => {
  const body = await c.req.json();
  const newUser = await db.insert(users).values(body).returning();
  return c.json({ message: "Create a new user", data: newUser });
});

usersRouter.patch("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  if (!existingUser) {
    return c.json({ message: "User not found" }, 404);
  }
  const updatedUser = await db
    .update(users)
    .set(body)
    .where(eq(users.id, id))
    .returning();
  return c.json({ message: "Update user with ID: " + id, data: updatedUser });
});

usersRouter.post("/findByEmail", async (c) => {
  const body = await c.req.json();
  const { email } = body;

  if (!email) {
    return c.json({ message: "Email is required" }, 400);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      albums: true,
    },
  });

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json({ message: "User found", data: user });
});

export default usersRouter;
