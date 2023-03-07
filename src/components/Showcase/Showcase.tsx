import { ReactElement, useCallback, useId, useRef, useState } from "react";

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

export const Showcase = <Data extends Record<"id", string>>({
  Component,
  items,
}: {
  Component: RenderElement<Data>;
  items: Data[];
}) => {
  const [activeItem, setActiveItem] = useState<Data | null>(null);
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

  const disableMoveBack = activeItem === items[0] || firstVisibleIndex === 0;

  const disableMoveForward =
    activeItem === items[items.length - 1] ||
    lastVisibleIndex === items.length - 1;

  const moveBack = () => {
    if (disableMoveBack) return;

    setActiveItem(items[firstVisibleIndex - 1]);
  };

  const moveForward = () => {
    if (disableMoveForward) return;

    setActiveItem(items[lastVisibleIndex + 1]);
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
            isActive={activeItem === item}
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
                  setActiveItem(item);
                }}
                aria-current={activeItem === item ? "true" : "false"}
              >
                <VisuallyHidden>Move to {index + 1}</VisuallyHidden>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={style.movingButtons}
        role="navigation"
        aria-controls={listId}
        aria-label="Move through vehicle list"
      >
        <button
          disabled={disableMoveBack}
          onClick={moveBack}
          aria-label="previous"
        >
          Back
        </button>
        <button
          disabled={disableMoveForward}
          onClick={moveForward}
          aria-label="next"
        >
          Fwd
        </button>
      </div>
    </div>
  );
};
