import type { InferGetStaticPropsType } from "next";

import { Showcase } from "@/components/Showcase";
import { VehicleCard } from "@/components/VehicleCard";
import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";

import style from "@/styles/index.module.css";
import { CircledLeftArrow, CircledRightArrow } from "@/icons/Circled";

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
        <h1 className={style.mainHeading}>Recharge cars</h1>

        <Showcase
          Component={VehicleCard}
          items={cars}
          backIcon={<CircledLeftArrow />}
          forwardIcon={<CircledRightArrow />}
        />
      </section>
    </main>
  );
}
