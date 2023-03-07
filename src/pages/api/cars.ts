import type { NextApiRequest, NextApiResponse } from "next";

import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import type { Car } from "@/lib/types";
import { readDB } from "@/lib/db";

type CarAPIResponse = Car[] | { message: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CarAPIResponse>
) {
  try {
    const data = await readDB();
    const cars = parseJSON(data);

    if (!Array.isArray(cars)) {
      throw new Error("Car data was not a list");
    }

    const onlyValidCars = cars.filter(isValidCar);

    return res.status(200).json(onlyValidCars);
  } catch (reason) {
    const message =
      reason instanceof Error
        ? reason.message
        : "Unexpected non-error exception";

    console.log("[Error]: api/cars", message);

    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export default handler;
