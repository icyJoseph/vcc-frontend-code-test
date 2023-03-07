import type { InferGetStaticPropsType } from "next";

import { Showcase } from "@/components/Showcase";
import { VehicleCard } from "@/components/VehicleCard";
import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";

import style from "@/styles/index.module.css";

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

export default function Home({
  cars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={style.layout}>
      <section aria-label={"Recharge Cars"}>
        <h1>Recharge cars</h1>

        <Showcase Component={VehicleCard} items={cars} />
      </section>
    </main>
  );
}
