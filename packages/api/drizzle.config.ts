import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/drizzle/schema.ts",
	driver: "d1",
	out: "./drizzle",
});
