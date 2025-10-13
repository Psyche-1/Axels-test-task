import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardHeader } from "../tsx";
import { BrowserRouter } from 'react-router-dom'
import { createHashRouter, RouterProvider } from "react-router";

const router = createHashRouter([
  {
    children: [
      {
        path: '*',
        Component: DashboardHeader,
      },
    ],
  },
]);

test('Snapshot test DashboardHeader', () => {
  const component = render(
    <RouterProvider router={router} />
    );
  expect(component).toMatchSnapshot();
});