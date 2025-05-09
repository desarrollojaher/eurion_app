import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "@/app/_layout";

const expoDB = SQLite.openDatabaseSync(DATABASE_NAME);

export const DrizzleStudioInitializer = () => {
  useDrizzleStudio(expoDB); // Correctamente dentro de un componente funcional
  return null; // No renderiza nada, solo inicializa Drizzle Studio
};
