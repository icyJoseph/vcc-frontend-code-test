import type { ComponentPropsWithoutRef, ElementType } from "react";

import style from "./text.module.css";

type TextSize = "sm" | "md" | "lg" | "xl";
type TextWeight = "normal" | "light" | "bold" | "highlight";
type Variation = "primary" | "secondary" | "none";

type TextElements = keyof Pick<
  JSX.IntrinsicElements,
  "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "a"
>;

type TextProps<T extends TextElements | ElementType> = {
  renderAs?: T;
  size?: TextSize;
  weight?: TextWeight;
  variation?: Variation;
} & ComponentPropsWithoutRef<T>;

const sizes: Record<TextSize, string> = {
  sm: style.textSm,
  md: style.textMd,
  lg: style.textLg,
  xl: style.textXl,
};

const weights: Record<TextWeight, string> = {
  normal: style.textNormal,
  bold: style.textBold,
  light: style.textLight,
  highlight: style.textHighlight,
};

const variations: Record<Variation, string> = {
  none: "",
  primary: style.textPrimary,
  secondary: style.textSecondary,
};

export const Text = <T extends ElementType = "p">({
  renderAs,
  size: textSize,
  weight: textWeight,
  variation,
  ...rest
}: TextProps<T>) => {
  const Tag = renderAs || "p";
  const size = sizes[textSize || "md"];
  const textVariation = variations[variation || "none"];
  const weight = weights[textWeight || "normal"];

  const className = `${rest.className || ""} ${
    style.typography
  } ${size} ${weight} ${textVariation}`.trim();

  return <Tag {...rest} className={className} />;
};
