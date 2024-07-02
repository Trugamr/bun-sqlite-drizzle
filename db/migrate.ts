import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./client";

migrate(db, { migrationsFolder: "db/migrations" });

console.log("Migration complete!");
