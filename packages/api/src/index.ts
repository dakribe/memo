import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { posts } from "./drizzle/schema";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/posts", async (c) => {
	const db = drizzle(c.env.DB);
	const allPosts = await db.select().from(posts);
	return c.json(allPosts);
});

app.post("/posts", async (c) => {
	const db = drizzle(c.env.DB);
	const { content } = await c.req.json();
	const id = createId();
	const post = await db.insert(posts).values({ id, content }).returning();

	return c.json(post);
});

export default app;
