import { ComponentProps, useId } from "react";

import style from "./select.module.css";

export const Select = ({
  label,
  className = "",
  ...rest
}: ComponentProps<"select"> & { label: string }) => {
  const selectId = useId();
  return (
    <fieldset className={style.field}>
      <label htmlFor={selectId} className={style.selectLabel}>
        {label}
      </label>
      <select {...rest} className={className} id={selectId} />
    </fieldset>
  );
};
