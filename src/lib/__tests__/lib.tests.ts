import JSONData from "../../../db/cars.json";

import { isValidCar } from "@/lib/cars";

test("isValidCar", () => {
  expect(JSONData.every(isValidCar)).toBe(true);
});
