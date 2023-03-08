const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Since Jest 28, IIRC, this has to be installed separately
  testEnvironment: "jest-environment-jsdom",
};

const jestConfigWithOverrides = async (...args) => {
  const fn = createJestConfig(customJestConfig);
  const res = await fn(...args);

  // The Next.js SVG loader, loads SVG as static assets,
  // but SVGR can help us use them as React components,
  // unfortunately, we must let Jest know about this swap.
  res.moduleNameMapper = {
    // we cannot depend on the exact key used by Next.js
    // so we inject an SVG key higher up on the mapping tree
    "\\.svg": "<rootDir>/src/__mocks__/svgrMock.js",
    ...res.moduleNameMapper,
  };

  return res;
};

module.exports = jestConfigWithOverrides;
