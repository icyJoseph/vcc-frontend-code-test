import { useId } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import { Container } from "@/components/Container";
import { Paragraph } from "@/components/Paragraph";
import { Showcase } from "@/components/Showcase";
import { Text } from "@/components/Text";
import {
  VehicleTitle,
  VehicleImage,
  VehicleCTALink,
  VehicleHeader,
} from "@/components/Vehicle";
import { VehicleCard } from "@/components/VehicleCard";
import { parseJSON } from "@/helpers";
import { CircledLeftArrow, CircledRightArrow } from "@/icons/Circled";
import { RightArrow } from "@/icons/RightArrow";
import { selectCarById, selectCarsByBodyType } from "@/lib/cars";
import { readDB } from "@/lib/db";

import spacer from "@/styles/spacer.module.css";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;

  if (typeof id !== "string") return { notFound: true };

  try {
    const data = await readDB();
    const cars = parseJSON(data);

    const carData = selectCarById(cars, id);

    const similar = selectCarsByBodyType(cars, carData.bodyType).filter(
      (item) => item.id !== carData.id
    );

    return { props: { carData, similar } };
  } catch (reason) {
    // report to a logging system
    return { notFound: true };
  }
};

const ReadMoreAboutVehicle = ({
  carData,
  similar,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { id, modelName, modelType, bodyType, imageUrl } = carData;
  const hasSimilar = similar.length > 0;

  const headingId = useId();

  return (
    <>
      <Container renderAs="section" aria-labelledby={headingId}>
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
      </Container>

      {hasSimilar && (
        <>
          <Container renderAs="div">
            <Text renderAs="h2" size="lg">
              Similar vehicles
            </Text>
          </Container>

          <Showcase
            items={similar}
            Component={VehicleCard}
            backIcon={<CircledLeftArrow />}
            forwardIcon={<CircledRightArrow />}
          />
        </>
      )}

      <Container>
        <VehicleCTALink href="/">
          <Text renderAs="span">Back to main page</Text>
          <span aria-hidden="true">
            <RightArrow />
          </span>
        </VehicleCTALink>
      </Container>

      <div className={spacer.vertical} />
    </>
  );
};

export default ReadMoreAboutVehicle;
