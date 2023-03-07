import fs from "fs/promises";
import { join } from "path";

const DB_PATH = "db/cars.json";
const pathToCarsDb = join(process.cwd(), DB_PATH);

export async function readDB() {
  const data = await fs.readFile(pathToCarsDb, "utf-8");

  return data;
}
