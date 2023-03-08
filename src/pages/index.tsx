import { useState } from "react";
import type { InferGetStaticPropsType } from "next";

import { Showcase } from "@/components/Showcase";
import { VehicleCard } from "@/components/VehicleCard";
import { parseJSON } from "@/helpers";
import { CircledLeftArrow, CircledRightArrow } from "@/icons/Circled";
import { bodyTypes, isBodyType, isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";
import type { Car } from "@/lib/types";

import style from "@/styles/index.module.css";
import { Select } from "@/components/Select";

export const getStaticProps = async () => {
  const data = await readDB();

  const cars = parseJSON(data);

  if (!Array.isArray(cars)) {
    return { props: { cars: [] } };
  }

  return {
    props: {
      cars: cars.filter(isValidCar),
    },
  };
};
type BodyTypeSelector = Car["bodyType"] | "";

export default function Home({
  cars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedBodyType, setSelectedBodyType] =
    useState<BodyTypeSelector>("");

  const filterByBodyType = selectedBodyType
    ? cars.filter(({ bodyType }) => {
        return selectedBodyType === bodyType;
      })
    : cars;

  return (
    <main className={style.layout}>
      <section aria-label={"Recharge Cars"}>
        <h1 className={style.mainHeading}>Recharge cars</h1>

        <Select
          label="Filter by body type"
          onChange={(event) => {
            const value = event.target.value;

            const update = isBodyType(value) ? value : "";

            return setSelectedBodyType(update);
          }}
        >
          <option value="">Show all</option>

          <optgroup label="By body type">
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            ))}
          </optgroup>
        </Select>
      </section>

      <Showcase
        Component={VehicleCard}
        items={filterByBodyType}
        backIcon={<CircledLeftArrow />}
        forwardIcon={<CircledRightArrow />}
      />
    </main>
  );
}
