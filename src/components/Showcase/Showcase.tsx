import { type ReactElement, useCallback, useId, useRef, useState } from "react";

import { VisuallyHidden } from "@/components/VisuallyHidden/";

import { ItemShowCase } from "./ItemShowcase";
import style from "./style.module.css";

type VisibilityChange<T> = (updated: T, isVisible: boolean) => void;
type WithVisibility<T extends Record<"id", unknown>> = T & {
  isVisible: boolean;
};
type RenderElement<T> = (props: T) => ReactElement;

const calcVisibleBounds = <T extends Record<"id", unknown>>(
  visibleItems: WithVisibility<T>[]
) => {
  const firstVisibleIndex = visibleItems.findIndex((item) => item.isVisible);
  const visibleCount = visibleItems.filter((item) => item.isVisible).length;
  const lastVisibleIndex = firstVisibleIndex + (visibleCount - 1);

  return [firstVisibleIndex, lastVisibleIndex];
};

const scrollListChildIntoView = (
  listElement: HTMLUListElement,
  target: number
) => {
  const children = listElement.children;
  const child = children.item(target);

  if (!child) return;

  child.scrollIntoView();
};

export const Showcase = <Data extends Record<"id", string>>({
  Component,
  items,
}: {
  Component: RenderElement<Data>;
  items: Data[];
}) => {
  const [visibleItems, setVisibleItems] = useState<WithVisibility<Data>[]>([]);

  const listId = useId();

  const listRef = useRef<HTMLUListElement>(null);

  const handleVisibilityChange: VisibilityChange<Data> = useCallback(
    (updated, isVisible) => {
      setVisibleItems((current) => {
        return items.map((item, index) => {
          if (item === updated) return { ...item, isVisible };

          const seen = current[index];
          if (seen) return seen;

          return { ...item, isVisible: false };
        });
      });
    },
    [items]
  );

  const [firstVisibleIndex, lastVisibleIndex] = calcVisibleBounds(visibleItems);

  const disableMoveBack = firstVisibleIndex === 0;

  const disableMoveForward = lastVisibleIndex === items.length - 1;

  const moveBack = () => {
    if (disableMoveBack) return;

    const element = listRef.current;
    if (!element) return;
    scrollListChildIntoView(element, firstVisibleIndex - 1);
  };

  const moveForward = () => {
    if (disableMoveForward) return;

    const element = listRef.current;
    if (!element) return;
    scrollListChildIntoView(element, lastVisibleIndex + 1);
  };

  return (
    <div className={style.wrapper}>
      <ul
        id={listId}
        className={style.list}
        ref={listRef}
        title={`A list with ${items.length} Recharge vehicles`}
      >
        {items.map((item) => (
          <ItemShowCase
            key={item.id}
            item={item}
            onVisibilityChange={handleVisibilityChange}
          >
            <Component {...item} />
          </ItemShowCase>
        ))}
      </ul>

      <nav
        className={style.spotlightNav}
        aria-label="Put a vehicle on the spotlight"
        aria-controls={listId}
      >
        <ul className={style.spotlightControls}>
          {items.map((item, index) => (
            <li key={item.id} aria-label={`Navigate to ${index + 1}`}>
              <a
                className={style.spotlightControlItem}
                onClick={() => {
                  const element = listRef.current;
                  if (!element) return;
                  scrollListChildIntoView(element, index);
                }}
                aria-current={visibleItems[index]?.isVisible ? "true" : "false"}
              >
                <VisuallyHidden>Move to {index + 1}</VisuallyHidden>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={style.sliderControl}
        role="navigation"
        aria-controls={listId}
        aria-label="Move through vehicle list"
      >
        <button
          className={style.controlButton}
          onClick={moveBack}
          aria-label="previous"
          aria-disabled={disableMoveBack ? "true" : "false"}
        >
          Back
        </button>
        <button
          className={style.controlButton}
          onClick={moveForward}
          aria-label="next"
          aria-disabled={disableMoveForward ? "true" : "false"}
        >
          Fwd
        </button>
      </div>
    </div>
  );
};
