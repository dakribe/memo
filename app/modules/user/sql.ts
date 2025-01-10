import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: varchar("email").notNull(),
	username: varchar("username", { length: 15 }).unique(),
});

export type InsertUser = typeof user.$inferInsert;
export type User = typeof user.$inferSelect;
