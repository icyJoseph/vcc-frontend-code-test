import { useEffect, useRef, useState, type ReactNode } from "react";

import { useVisibleSubscription } from "@/hooks/useVisibleSubscription";
import style from "./style.module.css";

type VoidVisibilityChangeCallback<Data> = (
  data: Data,
  isVisible: boolean
) => void;

export const ItemShowCase = <Data,>({
  isActive,
  children,
  onVisibilityChange,
  item,
}: {
  isActive: boolean;
  children: ReactNode;
  onVisibilityChange?: VoidVisibilityChangeCallback<Data>;
  item: Data;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [observerRef, subscribe] = useVisibleSubscription();
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;
    if (!isActive) return;

    const raf = requestAnimationFrame(() => {
      element.scrollIntoView();
    });

    return () => cancelAnimationFrame(raf);
  }, [isActive, observerRef]);

  useEffect(() => {
    const disconnect = subscribe((visible) => {
      onVisibilityChange?.(item, visible);
      setIsVisible(visible);
    });

    return disconnect;
  }, [subscribe, onVisibilityChange, item]);

  return (
    <li
      className={style.listItem}
      ref={itemRef}
      aria-hidden={isVisible ? "false" : "true"}
    >
      {/* this is a sentinel for intersection */}
      <span ref={observerRef} aria-hidden="true" className={style.sentinel} />
      {children}
    </li>
  );
};
