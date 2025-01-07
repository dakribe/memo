import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").defaultRandom().primaryKey(),
	username: varchar("username", { length: 15 }).unique().notNull(),
});

export type InsertUser = typeof user.$inferInsert;
export type User = typeof user.$inferSelect;
