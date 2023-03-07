import type { ReactNode } from "react";

import styles from "./style.module.css";

export const VisuallyHidden = ({ children }: { children: ReactNode }) => (
  <span className={styles.srOnly}>{children}</span>
);
