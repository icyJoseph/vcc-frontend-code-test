import { ReactElement, useCallback, useRef, useState } from "react";
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
  const lastVisibleIndex =
    firstVisibleIndex +
    visibleItems.slice(firstVisibleIndex + 1).filter((item) => item.isVisible)
      .length;

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
      <ul className={style.list} ref={listRef}>
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

      <nav role="navigation" aria-label="Navigate through vehicles">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setActiveItem(item);
                }}
              >
                {item.id}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <button disabled={disableMoveBack} onClick={moveBack}>
          Back
        </button>
        <button disabled={disableMoveForward} onClick={moveForward}>
          Fwd
        </button>
      </div>
    </div>
  );
};
