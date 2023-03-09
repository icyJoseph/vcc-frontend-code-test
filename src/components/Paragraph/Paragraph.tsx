import type { ReactNode } from "react";

import { Text } from "@/components/Text";

import style from "./paragraph.module.css";

export const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text className={style.paragraph}>{children}</Text>
);
