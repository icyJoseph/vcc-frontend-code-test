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
import { selectCarById } from "@/lib/cars";
import { readDB } from "@/lib/db";
import { RightArrow } from "@/icons/RightArrow";

import spacer from "@/styles/spacer.module.css";

const SOLD_OUT = "sold-out";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.params?.id;

  if (typeof id !== "string") return { notFound: true };

  try {
    const data = await readDB();
    const cars = parseJSON(data);

    const carData = selectCarById(cars, id);

    return { props: { carData, status: SOLD_OUT } };
  } catch (reason) {
    // report to a logging system
    return { notFound: true };
  }
};

const VehicleShop = ({
  carData,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { id, modelName, modelType, bodyType, imageUrl } = carData;

  const headingId = useId();
  return (
    <Container renderAs="section" aria-labelledby={headingId}>
      <Text id={headingId} renderAs="h1" size="xl">
        Purchase
      </Text>

      <VehicleHeader>
        <VehicleTitle modelName={modelName} modelType={modelType} />

        <Text renderAs="span" variation="secondary">
          {bodyType.toUpperCase()}
        </Text>
      </VehicleHeader>

      {status === SOLD_OUT && <SoldOut />}

      <VehicleCTALink href={`/learn/${id}`}>
        <Text renderAs="span">Learn</Text>
        <span aria-hidden="true">
          <RightArrow />
        </span>
      </VehicleCTALink>

      <VehicleImage src={imageUrl} alt={modelName} />

      <Paragraph>This vehicle is not available for purchase.</Paragraph>

      <VehicleCTALink href="/">
        <Text renderAs="span">back to main page</Text>
        <span aria-hidden="true">
          <RightArrow />
        </span>
      </VehicleCTALink>

      <div className={spacer.vertical} />
    </Container>
  );
};

export default VehicleShop;
