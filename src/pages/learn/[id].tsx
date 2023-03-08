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
import { RightArrow } from "@/icons/RightArrow";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";

import style from "@/styles/layout.module.css";

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

const ReadMoreAboutVehicle = ({
  carData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { id, modelName, modelType, bodyType, imageUrl } = carData;
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
          Learn more
        </Text>

        <header className={style.header}>
          <VehicleTitle modelName={modelName} modelType={modelType} />
          <Text renderAs="span" variation="secondary">
            {bodyType.toUpperCase()}
          </Text>
        </header>

        <VehicleImage src={imageUrl} alt={modelName} />

        <VehicleCTALink href={`/shop/${id}`}>
          <Text renderAs="span">Buy this vehicle</Text>
          <span aria-hidden="true">
            <RightArrow />
          </span>
        </VehicleCTALink>

        <Text className={style.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint
          repellat voluptatem ad? Quam impedit beatae consectetur fugit
          laudantium voluptas. Dignissimos ipsum maxime quidem error nobis!
          Sapiente consequatur incidunt sequi.
        </Text>

        <Text className={style.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint
          repellat voluptatem ad? Quam impedit beatae consectetur fugit
          laudantium voluptas. Dignissimos ipsum maxime quidem error nobis!
          Sapiente consequatur incidunt sequi.
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

export default ReadMoreAboutVehicle;
