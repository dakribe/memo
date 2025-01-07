import { db } from "../drizzle/index.server";
import { InsertUser, user } from "./sql";

export async function createUser(params: InsertUser) {
	return await db.insert(user).values(params);
}
