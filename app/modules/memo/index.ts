import { eq } from "drizzle-orm";
import { db } from "../drizzle/index.server";
import { InsertMemo, memo } from "./sql";

export namespace Memo {
	export async function create(params: InsertMemo) {
		return await db.insert(memo).values(params).returning();
	}

	export async function deleteById(id: string) {
		return await db.delete(memo).where(eq(memo.id, id));
	}

	export async function getAll(userId: string) {
		return await db.query.memo.findMany({
			where: eq(memo.userId, userId),
		});
	}

	export async function getById(id: string) {
		return await db.query.memo.findFirst({
			where: eq(memo.id, id),
		});
	}
}
