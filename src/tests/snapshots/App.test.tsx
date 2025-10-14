import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import CrudDashboard from "../../App.tsx";
import { add } from "../../App.tsx";

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

test('Snapshot test App', () => {
  const app = render(<CrudDashboard />);
  expect(app).toMatchSnapshot();
});