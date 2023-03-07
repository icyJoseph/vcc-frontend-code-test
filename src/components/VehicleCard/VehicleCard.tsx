import Image from "next/image";
import Link from "next/link";

import { VisuallyHidden } from "@/components/VisuallyHidden";
import type { Car } from "@/lib/types";

// import ChevronSmall from "@/icons/chevron-small.svg";

import style from "./style.module.css";

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
      <span className={style.cardSubTitle}>{bodyType}</span>

      <div>
        <h2 className={style.cardTitle}>{modelName}</h2>{" "}
        <span>{modelType}</span>
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
        <span aria-hidden="true">Learn</span>
      </Link>

      <Link href={`/shop/${id}`} className={style.cardCallToAction}>
        <VisuallyHidden>
          Purchase {modelName}, {modelType}
        </VisuallyHidden>
        <span aria-hidden="true">Shop</span>
      </Link>
    </footer>
  </article>
);
