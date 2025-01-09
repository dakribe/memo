import { drizzle } from "drizzle-orm/neon-http";
import { user } from "../user/sql";
import { memo } from "../memo/sql";

export const schema = {
	user,
	memo,
};

export const db = drizzle(process.env.DATABASE_URL!, {
	schema,
});
