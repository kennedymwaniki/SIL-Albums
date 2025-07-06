import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import * as dotenv from "dotenv";
import * as schema from "./schema";

console.log("Loading environment variables...");
// dotenv.config({ path: ".env" });

const DBURL = process.env.DATABASE_URL!;
console.log("Database URL:", DBURL);

// Add better error handling

const client = neon(DBURL);

export const db = drizzle(client, { schema, logger: true });

export default db;
