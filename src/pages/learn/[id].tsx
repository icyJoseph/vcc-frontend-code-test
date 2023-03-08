import { useId } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { Container } from "@/components/Container";
import { Paragraph } from "@/components/Paragraph";
import { Text } from "@/components/Text";
import {
  VehicleTitle,
  VehicleImage,
  VehicleCTALink,
  VehicleHeader,
} from "@/components/Vehicle";
import { parseJSON } from "@/helpers";
import { RightArrow } from "@/icons/RightArrow";
import { selectCarById } from "@/lib/cars";
import { readDB } from "@/lib/db";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;

  if (typeof id !== "string") return { notFound: true };

  try {
    const data = await readDB();
    const cars = parseJSON(data);

    const carData = selectCarById(cars, id);

    return { props: { carData } };
  } catch (reason) {
    // report to a logging system
    return { notFound: true };
  }
};

const ReadMoreAboutVehicle = ({
  carData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { id, modelName, modelType, bodyType, imageUrl } = carData;
  const headingId = useId();

  return (
    <Container>
      <section aria-labelledby={headingId}>
        <Text id={headingId} renderAs="h1" size="xl">
          Learn more
        </Text>

        <VehicleHeader>
          <VehicleTitle modelName={modelName} modelType={modelType} />
          <Text renderAs="span" variation="secondary">
            {bodyType.toUpperCase()}
          </Text>
        </VehicleHeader>

        <VehicleCTALink href={`/shop/${id}`}>
          <Text renderAs="span">Buy this vehicle</Text>
          <span aria-hidden="true">
            <RightArrow />
          </span>
        </VehicleCTALink>

        <VehicleImage src={imageUrl} alt={modelName} />

        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint
          repellat voluptatem ad? Quam impedit beatae consectetur fugit
          laudantium voluptas. Dignissimos ipsum maxime quidem error nobis!
          Sapiente consequatur incidunt sequi.
        </Paragraph>

        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sint
          repellat voluptatem ad? Quam impedit beatae consectetur fugit
          laudantium voluptas. Dignissimos ipsum maxime quidem error nobis!
          Sapiente consequatur incidunt sequi.
        </Paragraph>

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

export default ReadMoreAboutVehicle;
