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

const SOLD_OUT = "sold-out";

/**
 * learn and shop, given the problem setup,
 * share the same GSSP, but in practice, these
 * are likely to grow apart, because learn needs
 * to give us also a description, and perhaps
 * similar vehicles.
 *
 * Meanwhile, shop, would need to get the latest
 * prices, financing options, etc.
 *
 * Sharing code at this level, this early, is not
 * the best of ideas. To introduce some kind of difference
 * I have a "useless" constant, SOLD_OUT,
 * which is passed as `status` to the Page.
 *
 */
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

        {status === SOLD_OUT && <SoldOut />}

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
