import type { ComponentProps } from "react";

import Circled from "./chevron-circled.svg";
import style from "./style.module.css";

export const CircledRightArrow = ({
  className = "",
  ...rest
}: ComponentProps<"svg">) => (
  <Circled {...rest} className={`${style.circledRightArrow} ${className}`} />
);

export const CircledLeftArrow = ({
  className = "",
  ...rest
}: ComponentProps<"svg">) => (
  <Circled {...rest} className={`${style.circledLeftArrow} ${className}`} />
);
