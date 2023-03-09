import fs from "fs/promises";
import { join } from "path";

let DB_PATH: string;

if (process.env.NODE_ENV === "development") {
  DB_PATH = "db/cars.json";
} else {
  const dbPath = process.env.CARS_DB_PATH;

  if (typeof dbPath !== "string") {
    throw new Error("Missing CARS_DB_PATH path for production");
  }

  DB_PATH = dbPath;
}

const pathToCarsDb = join(process.cwd(), DB_PATH);

export async function readDB() {
  const data = await fs.readFile(pathToCarsDb, "utf-8");

  return data;
}
