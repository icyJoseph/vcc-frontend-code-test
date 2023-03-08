import type { ComponentPropsWithoutRef, ElementType } from "react";

import style from "./container.module.css";

type ContainerElements = keyof Pick<
  JSX.IntrinsicElements,
  "main" | "section" | "div" | "article"
>;

type ContainerProps<T extends ContainerElements | ElementType> = {
  renderAs?: T;
} & ComponentPropsWithoutRef<T>;

export const Container = <T extends ElementType = "main">({
  renderAs,
  children,
}: ContainerProps<T>) => {
  const Tag = renderAs || "main";

  return <Tag className={style.container}>{children}</Tag>;
};
