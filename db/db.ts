import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import * as dotenv from "dotenv";
import * as schema from "./schema";

console.log("Loading environment variables...");
// dotenv.config({ path: ".env" });

const DBURL =
  "postgresql://neondb_owner:npg_UHapfsm0BJ6j@ep-weathered-paper-a9vc8zy9-pooler.gwc.azure.neon.tech/silfrontend?sslmode=require&channel_binding=require";

// Add better error handling

const client = neon(DBURL);

export const db = drizzle(client, { schema, logger: true });

export default db;
