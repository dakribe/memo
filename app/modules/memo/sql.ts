import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "../user/sql";

export const memo = pgTable("memo", {
	id: uuid("id").defaultRandom().primaryKey(),
	message: varchar("message", { length: 120 }).notNull(),
	userId: uuid("user_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});

export type InsertMemo = typeof memo.$inferInsert;
export type Memo = typeof memo.$inferSelect;
