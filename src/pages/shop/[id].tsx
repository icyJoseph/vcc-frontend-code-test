import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { VehicleCard } from "@/components/VehicleCard";
import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";

import style from "@/styles/learn.module.css";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;

  if (typeof id !== "string") return { notFound: true };

  const data = await readDB();
  const cars = parseJSON(data);

  // good enough fallback
  if (!Array.isArray(cars)) return { notFound: true };

  const carData = cars.filter(isValidCar).find((item) => item.id === id);

  if (!carData) return { notFound: true };

  return { props: { carData } };
};

const VehicleShop = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { carData } = props;

  return (
    <main className={style.layout}>
      <VehicleCard {...carData} />
    </main>
  );
};

export default VehicleShop;
