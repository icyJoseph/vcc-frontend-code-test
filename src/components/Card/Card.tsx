import type { ReactNode } from "react";

import style from "./card.module.css";

const Header = ({ children }: { children: ReactNode }) => (
  <header className={style.cardHeader}>{children}</header>
);

const Footer = ({ children }: { children: ReactNode }) => (
  <footer role="contentinfo" className={style.cardFooter}>
    {children}
  </footer>
);

const Content = ({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) => (
  <section aria-label={ariaLabel} className={style.cardContent}>
    {children}
  </section>
);

export const Card = ({
  ariaLabel,
  children,
}: {
  children: ReactNode;
  ariaLabel: string;
}) => (
  <article
    aria-label={ariaLabel}
    role="contentinfo"
    className={style.cardWrapper}
  >
    {children}
  </article>
);

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;
