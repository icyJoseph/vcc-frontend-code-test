import { useRef, useState, useEffect, useCallback } from "react";

type onVisibleChange = (visible: boolean) => void;

const options: IntersectionObserverInit = { threshold: 1.0 };

export function useVisibleSubscription<
  Element extends HTMLElement = HTMLElement
>() {
  const ref = useRef<Element>(null);

  const subscribe = useCallback((onChange?: onVisibleChange) => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      onChange?.(entry.isIntersecting);
    }, options);

    observer.observe(element);

    const unsub = () => {
      observer.disconnect();
    };

    return unsub;
  }, []);

  return [ref, subscribe] as const;
}
