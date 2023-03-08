import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Text } from "@/components/Text";

import vehicle from "./vehicle.module.css";

export const VehicleTitle = ({
  modelName,
  modelType,
}: {
  modelName: string;
  modelType: string;
}) => (
  <div>
    <Text renderAs="h2" size="lg" className={vehicle.title}>
      {modelName}
    </Text>{" "}
    <Text renderAs="span" size="md" weight="highlight" variation="secondary">
      {modelType}
    </Text>
  </div>
);

export const VehicleSubTitle = ({ bodyType }: { bodyType: string }) => (
  <Text
    renderAs="span"
    variation="secondary"
    weight="bold"
    className={vehicle.subTitle}
  >
    {bodyType}
  </Text>
);

// CTA: Call To Action
export const VehicleCTALink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link href={href} className={vehicle.callToAction}>
    {children}
  </Link>
);

export const VehicleImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    className={vehicle.image}
    src={src}
    alt={alt}
    width={800}
    height={600}
  />
);
