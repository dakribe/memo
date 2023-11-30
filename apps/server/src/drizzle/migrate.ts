import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";

export const applyMigrations = async (
  db: NodePgDatabase<Record<string, never>>,
) => {
  await migrate(db, { migrationsFolder: "drizzle" });
};
