import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
	id: text("id"),
	content: text("content"),
});
