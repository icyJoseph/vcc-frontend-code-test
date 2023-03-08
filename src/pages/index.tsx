import { useEffect, useState } from "react";
import type { InferGetStaticPropsType } from "next";

import { Container } from "@/components/Container";
import { Select } from "@/components/Select";
import { Showcase } from "@/components/Showcase";
import { Text } from "@/components/Text";
import { VehicleCard } from "@/components/VehicleCard";
import { CircledLeftArrow, CircledRightArrow } from "@/icons/Circled";
import { parseJSON } from "@/helpers";
import { bodyTypes, isBodyType, isValidCar } from "@/lib/cars";
import { readDB } from "@/lib/db";
import type { Car } from "@/lib/types";

import alertBox from "@/styles/alertbox.module.css";
import plainButton from "@/styles/plain-button.module.css";

export const getStaticProps = async () => {
  const data = await readDB();

  const cars = parseJSON(data);

  if (!Array.isArray(cars)) {
    return { props: { initialCars: [] } };
  }

  return {
    props: {
      initialCars: cars.filter(isValidCar),
    },
  };
};

type BodyTypeSelector = Car["bodyType"] | "";

const FilterLabel = (
  <Text renderAs="span" variation="secondary">
    Filter by body type
  </Text>
);

export default function Home({
  initialCars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedBodyType, setSelectedBodyType] =
    useState<BodyTypeSelector>("");

  const [cars, setCars] = useState(initialCars);

  const [showAlert, setShowAlert] = useState(false);

  const filterByBodyType = selectedBodyType
    ? cars.filter(({ bodyType }) => {
        return selectedBodyType === bodyType;
      })
    : cars;

  // It is hard to motivate using `useEffect` and re-fetch
  // as we render, since GetStaticProps, or even GSSP, lean
  // themselves as better alternatives for data-fetching,
  // but here it goes anyway
  async function fetchCars(signal?: AbortSignal) {
    try {
      const response = await fetch("/api/cars", { signal: signal });
      // since we have "initial" data, we can just keep on showing that
      if (!response.ok) return;

      const data = await response.json();

      if (!Array.isArray(data)) {
        return setShowAlert(true);
      }

      const newCars = data.filter(isValidCar);

      setShowAlert(false);

      return setCars(newCars);
    } catch (reason) {
      if (signal?.aborted) return;

      if (reason instanceof Error) {
        console.log(reason.message);
      }
      return setShowAlert(true);
    }
  }
  useEffect(() => {
    const controller = new AbortController();

    fetchCars(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Container renderAs="section" aria-label={"Recharge Cars"}>
        <Text renderAs="h1" size="xl">
          Recharge cars
        </Text>

        <Select
          label={FilterLabel}
          onChange={(event) => {
            const value = event.target.value;

            const update = isBodyType(value) ? value : "";

            return setSelectedBodyType(update);
          }}
        >
          <option value="">Show all</option>

          {bodyTypes.map((type) => (
            <option key={type} value={type}>
              {type.toUpperCase()}
            </option>
          ))}
        </Select>
      </Container>

      <Showcase
        Component={VehicleCard}
        items={filterByBodyType}
        backIcon={<CircledLeftArrow />}
        forwardIcon={<CircledRightArrow />}
      />

      {showAlert && (
        <div className={alertBox.padded}>
          <Text role="alert" renderAs="span" variation="secondary">
            We had a problem, this list might be outdated.
          </Text>
          <button className={plainButton.plain} onClick={() => fetchCars()}>
            <Text renderAs="span">Retry.</Text>
          </button>
        </div>
      )}
    </>
  );
}
