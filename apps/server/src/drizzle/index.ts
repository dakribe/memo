import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { Client } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

const client = new Client({
  connectionString: DATABASE_URL,
});

const connect = async () => {
  await client.connect();
};
connect();

export const db = drizzle(client);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 255 }),
});
