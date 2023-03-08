import type { ReactNode } from "react";

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
import ChevronSmall from "@/icons/chevron-small.svg";

import style from "./vehicle-card.module.css";

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
        Learn <ChevronSmall className={style.rightArrow} />
      </Text>
    </VehicleCTALink>

    <VehicleCTALink href={`/shop/${id}`}>
      <VisuallyHidden>
        Purchase {modelName}, {modelType}
      </VisuallyHidden>

      <Text renderAs="span" weight="highlight" size="sm" aria-hidden="true">
        Shop <ChevronSmall className={style.rightArrow} />
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
      <VehicleImage src={imageUrl} alt={`An image of ${modelName} car model`} />
    </VehicleCardContent>

    <VehicleCardFooter id={id} modelName={modelName} modelType={modelType} />
  </Card>
);
