import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { mockIntersectionObserver } from "jsdom-testing-mocks";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Home from "@/pages/";
import { Car } from "@/lib/types";

mockIntersectionObserver();

const mockData: Car[] = [
  {
    id: "0",
    bodyType: "suv",
    modelName: "abc",
    modelType: "plug-in hybrid",
    imageUrl: "/foo1.jpg",
  },

  {
    id: "1",
    bodyType: "estate",
    modelName: "xyz",
    modelType: "plug-in hybrid",
    imageUrl: "/foo2.jpg",
  },

  {
    id: "2",
    bodyType: "sedan",
    modelName: "123",
    modelType: "pure electric",
    imageUrl: "/foo3.jpg",
  },
];

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

test("Landing page", async () => {
  server.use(
    rest.get("/api/cars", (req, res, ctx) => {
      return res(ctx.json(mockData));
    })
  );

  render(<Home initialCars={mockData} />);

  expect(screen.getByText(/suv/)).toBeInTheDocument();
  expect(screen.getByText(/estate/)).toBeInTheDocument();
  expect(screen.getByText(/sedan/)).toBeInTheDocument();

  await userEvent.selectOptions(
    screen.getByLabelText(/filter by body type/i),
    "suv"
  );

  expect(screen.getByText(/suv/)).toBeInTheDocument();
  expect(() => screen.getByText(/state/)).toThrow();
  expect(() => screen.getByText(/sedan/)).toThrow();

  await userEvent.selectOptions(
    screen.getByLabelText(/filter by body type/i),
    ""
  );

  expect(screen.getByText(/suv/)).toBeInTheDocument();
  expect(screen.getByText(/estate/)).toBeInTheDocument();
  expect(screen.getByText(/sedan/)).toBeInTheDocument();
});

test("Landing page with new cars", async () => {
  server.use(
    rest.get("/api/cars", (req, res, ctx) => {
      return res(
        ctx.json([
          ...mockData,
          {
            id: "4",
            bodyType: "suv",
            modelName: "new-model",
            modelType: "pure electric",
            imageUrl: "/new-model.jpg",
          },
        ])
      );
    })
  );

  render(<Home initialCars={mockData} />);

  await waitFor(() => expect(screen.getAllByText(/suv/)).toHaveLength(2));
});

test("Landing page with outdated cars", async () => {
  server.use(
    rest.get("/api/cars", (req, res, ctx) => {
      return res.networkError("Internal Server Error");
    })
  );

  render(<Home initialCars={mockData} />);

  await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());

  server.use(
    rest.get("/api/cars", (req, res, ctx) => {
      return res(ctx.json(mockData));
    })
  );

  await userEvent.click(screen.getByText(/retry/i));

  await waitFor(() => expect(() => screen.getByRole("alert")).toThrow());
});
