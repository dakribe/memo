import { eq } from "drizzle-orm";
import { db } from "../drizzle/index.server";
import { user } from "./sql";

export async function createUser(email: string) {
	let [newUser] = await db.insert(user).values({ email }).returning();
	return newUser;
}

export async function byEmail(email: string) {
	return await db.select().from(user).where(eq(user.email, email));
}

export async function byUsername(username: string) {
	return await db.query.user.findFirst({
		where: eq(user.username, username),
	});
}

export async function update(username: string, userId: string) {
	return await db.update(user).set({ username }).where(eq(user.id, userId));
}
