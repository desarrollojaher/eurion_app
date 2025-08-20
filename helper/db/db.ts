import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

export const DATABASE_NAME = "cobranza";
const expoDB = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDB, { logger: true });
export const expoDBInstance = expoDB;
