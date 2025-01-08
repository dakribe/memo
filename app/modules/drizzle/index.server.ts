import { drizzle } from "drizzle-orm/neon-http";
import { user } from "../user/sql";

export const schema = {
	user,
};

export const db = drizzle(process.env.DATABASE_URL!, {
	schema,
});
