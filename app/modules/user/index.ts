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
