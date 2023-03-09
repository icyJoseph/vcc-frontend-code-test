import JSONData from "../../../db/cars.json";

import { isValidCar } from "@/lib/cars";

test("isValidCar", () => {
  expect(JSONData.every(isValidCar)).toBe(true);

  expect(isValidCar({ id: "foo", modelName: "bar" })).toBe(false);

  expect(isValidCar(null)).toBe(false);
  expect(isValidCar(NaN)).toBe(false);
  expect(isValidCar(undefined)).toBe(false);
  expect(isValidCar([])).toBe(false);
});
