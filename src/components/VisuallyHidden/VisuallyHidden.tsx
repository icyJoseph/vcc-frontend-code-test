import type { ReactNode } from "react";

import styles from "./visually-hidden.module.css";

export const VisuallyHidden = ({ children }: { children: ReactNode }) => (
  <span className={styles.srOnly}>{children}</span>
);
