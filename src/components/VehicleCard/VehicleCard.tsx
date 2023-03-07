import Image from "next/image";
import Link from "next/link";

import { VisuallyHidden } from "@/components/VisuallyHidden";
import type { Car } from "@/lib/types";

export const VehicleCard = ({
  id,
  modelName,
  bodyType,
  modelType,
  imageUrl,
}: Car) => (
  <article aria-label={`${modelName}`} role="contentinfo">
    <header>
      <span>{bodyType}</span>

      <h2>{modelName}</h2>

      <span>{modelType}</span>
    </header>

    <section aria-label={modelName}>
      <div>
        <Image
          src={imageUrl}
          alt={`An image of ${modelName} car model`}
          width={800}
          height={600}
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
        />
      </div>
    </section>

    <footer role="contentinfo">
      <VisuallyHidden>More about {modelName}</VisuallyHidden>

      <Link href={`/learn/${id}`}>
        <VisuallyHidden>Read more about {modelName}</VisuallyHidden>
        Learn
      </Link>

      <Link href={`/shop/${id}`}>
        <VisuallyHidden>Purchase {modelName}</VisuallyHidden>
        Shop
      </Link>
    </footer>
  </article>
);
