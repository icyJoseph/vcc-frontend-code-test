import { useId } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { Text } from "@/components/Text";
import {
  VehicleTitle,
  VehicleImage,
  VehicleCTALink,
} from "@/components/Vehicle";
import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";

import style from "@/styles/layout.module.css";
import { RightArrow } from "@/icons/RightArrow";

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

const VehicleShop = ({
  carData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { modelName, modelType, bodyType, imageUrl } = carData;

  const headingId = useId();
  return (
    <main className={style.container}>
      <section aria-labelledby={headingId}>
        <Text
          id={headingId}
          renderAs="h1"
          size="xl"
          className={style.mainHeading}
        >
          Purchase
        </Text>

        <header className={style.header}>
          <VehicleTitle modelName={modelName} modelType={modelType} />

          <Text renderAs="span" variation="secondary">
            {bodyType.toUpperCase()}
          </Text>
        </header>

        <VehicleImage src={imageUrl} alt={modelName} />

        <Text role="alert" className={style.soldOut}>
          sold out
        </Text>

        <Text className={style.paragraph}>
          This vehicle is not available for purchase.
        </Text>

        <VehicleCTALink href="/">
          <Text renderAs="span">Explore more vehicles</Text>
          <span aria-hidden="true">
            <RightArrow />
          </span>
        </VehicleCTALink>
      </section>
    </main>
  );
};

export default VehicleShop;
