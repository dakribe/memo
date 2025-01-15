import { eq } from "drizzle-orm";
import { db } from "../drizzle/index.server";
import { profile } from "./sql";

export namespace Profile {
	export async function create(id: string, username: string) {
		return await db.insert(profile).values({ userId: id, username: username });
	}

	export async function byUsername(username: string) {
		return await db.query.profile.findFirst({
			where: eq(profile.username, username),
		});
	}
}
