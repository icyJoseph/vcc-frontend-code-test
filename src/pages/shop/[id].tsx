import { useId } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { Container } from "@/components/Container";
import { Paragraph } from "@/components/Paragraph";
import { SoldOut } from "@/components/SoldOut";
import { Text } from "@/components/Text";
import {
  VehicleTitle,
  VehicleImage,
  VehicleCTALink,
  VehicleHeader,
} from "@/components/Vehicle";
import { parseJSON } from "@/helpers";
import { isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";
import { RightArrow } from "@/icons/RightArrow";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;

  if (typeof id !== "string") return { notFound: true };

  const data = await readDB();
  const cars = parseJSON(data);

  // good enough fallback
  if (!Array.isArray(cars)) return { notFound: true };

  const carData = cars.filter(isValidCar).find((item) => item.id === id);

  // alternatively redirect back to `/`
  if (!carData) return { notFound: true };

  return { props: { carData } };
};

const VehicleShop = ({
  carData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { modelName, modelType, bodyType, imageUrl } = carData;

  const headingId = useId();
  return (
    <Container>
      <section aria-labelledby={headingId}>
        <Text id={headingId} renderAs="h1" size="xl">
          Purchase
        </Text>

        <VehicleHeader>
          <VehicleTitle modelName={modelName} modelType={modelType} />

          <Text renderAs="span" variation="secondary">
            {bodyType.toUpperCase()}
          </Text>
        </VehicleHeader>

        <VehicleImage src={imageUrl} alt={modelName} />

        <SoldOut />

        <Paragraph>This vehicle is not available for purchase.</Paragraph>

        <VehicleCTALink href="/">
          <Text renderAs="span">Explore more vehicles</Text>
          <span aria-hidden="true">
            <RightArrow />
          </span>
        </VehicleCTALink>
      </section>
    </Container>
  );
};

export default VehicleShop;
