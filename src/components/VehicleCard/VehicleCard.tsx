import type { ReactNode } from "react";
import Link from "next/link";

import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import {
  VehicleCTALink,
  VehicleImage,
  VehicleSubTitle,
  VehicleTitle,
} from "@/components/Vehicle/Vehicle";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import type { Car } from "@/lib/types";
import { RightArrow } from "@/icons/RightArrow";

const VehicleCardHeader = ({
  bodyType,
  modelName,
  modelType,
}: Pick<Car, "bodyType" | "modelName" | "modelType">) => (
  <Card.Header>
    <VehicleSubTitle bodyType={bodyType} />

    <VehicleTitle modelName={modelName} modelType={modelType} />
  </Card.Header>
);

const VehicleCardFooter = ({
  id,
  modelName,
  modelType,
}: Pick<Car, "id" | "modelName" | "modelType">) => (
  <Card.Footer>
    <VehicleCTALink href={`/learn/${id}`}>
      <VisuallyHidden>
        Read more about {modelName}, {modelType}
      </VisuallyHidden>

      <Text renderAs="span" weight="highlight" size="sm" aria-hidden="true">
        Learn <RightArrow />
      </Text>
    </VehicleCTALink>

    <VehicleCTALink href={`/shop/${id}`}>
      <VisuallyHidden>
        Purchase {modelName}, {modelType}
      </VisuallyHidden>

      <Text renderAs="span" weight="highlight" size="sm" aria-hidden="true">
        Shop <RightArrow />
      </Text>
    </VehicleCTALink>
  </Card.Footer>
);

const VehicleCardContent = ({
  children,
  modelName,
}: {
  children: ReactNode;
  modelName: string;
}) => <Card.Content ariaLabel={modelName}>{children}</Card.Content>;

export const VehicleCard = ({
  id,
  modelName,
  bodyType,
  modelType,
  imageUrl,
}: Car) => (
  <Card ariaLabel={`${modelName}`}>
    <VehicleCardHeader
      bodyType={bodyType}
      modelType={modelType}
      modelName={modelName}
    />

    <VehicleCardContent modelName={modelName}>
      <Link href={`/shop/${id}`}>
        <VehicleImage
          src={imageUrl}
          alt={`An image of ${modelName} car model`}
        />
      </Link>
    </VehicleCardContent>

    <VehicleCardFooter id={id} modelName={modelName} modelType={modelType} />
  </Card>
);
