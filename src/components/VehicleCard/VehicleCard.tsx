import Image from "next/image";
import Link from "next/link";

import { VisuallyHidden } from "@/components/VisuallyHidden";
import type { Car } from "@/lib/types";

import ChevronSmall from "@/icons/chevron-small.svg";

import style from "./vehicle-card.module.css";
import { Text } from "../Text";

export const VehicleCard = ({
  id,
  modelName,
  bodyType,
  modelType,
  imageUrl,
}: Car) => (
  <article
    aria-label={`${modelName}`}
    role="contentinfo"
    className={style.cardWrapper}
  >
    <header className={style.cardHeader}>
      <Text
        renderAs="span"
        variation="secondary"
        weight="bold"
        className={style.cardSubTitle}
      >
        {bodyType}
      </Text>

      <div>
        <Text renderAs="h2" size="lg" className={style.cardTitle}>
          {modelName}
        </Text>{" "}
        <Text
          renderAs="span"
          size="md"
          weight="highlight"
          variation="secondary"
        >
          {modelType}
        </Text>
      </div>
    </header>

    <section aria-label={modelName} className={style.cardContent}>
      <Image
        className={style.cardImage}
        src={imageUrl}
        alt={`An image of ${modelName} car model`}
        width={800}
        height={600}
        style={{ objectFit: "contain", width: "100%", height: "auto" }}
      />
    </section>

    <footer role="contentinfo" className={style.cardFooter}>
      <VisuallyHidden>
        More about {modelName}, {modelType}
      </VisuallyHidden>

      <Link href={`/learn/${id}`} className={style.cardCallToAction}>
        <VisuallyHidden>
          Read more about {modelName}, {modelType}
        </VisuallyHidden>

        <Text renderAs="span" weight="highlight" size="sm" aria-hidden="true">
          Learn <ChevronSmall className={style.rightArrow} />
        </Text>
      </Link>

      <Link href={`/shop/${id}`} className={style.cardCallToAction}>
        <VisuallyHidden>
          Purchase {modelName}, {modelType}
        </VisuallyHidden>

        <Text renderAs="span" weight="highlight" size="sm" aria-hidden="true">
          Shop <ChevronSmall className={style.rightArrow} />
        </Text>
      </Link>
    </footer>
  </article>
);
