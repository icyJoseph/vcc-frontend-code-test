import { Text } from "@/components/Text";

import style from "./soldout.module.css";

export const SoldOut = () => (
  <Text role="alert" className={style.soldOut}>
    sold out
  </Text>
);
