import { Elysia } from "elysia";
import { applyMigrations } from "./drizzle/migrate";
import { db } from "./drizzle";

const app = new Elysia();

applyMigrations(db);

app.get("/", () => "Hello world");

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
