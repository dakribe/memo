import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "../user/sql";

export const profile = pgTable("profile", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.references(() => user.id)
		.notNull(),
	username: varchar("username")
		.references(() => user.username)
		.unique(),
	bio: varchar("bio", { length: 255 }),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});

export type InsertProfile = typeof profile.$inferInsert;
export type Profile = typeof profile.$inferSelect;
