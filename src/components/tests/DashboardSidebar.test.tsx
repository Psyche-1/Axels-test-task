import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DashboardSidebar } from "../tsx";
import { BrowserRouter } from 'react-router-dom'
import { createHashRouter, RouterProvider } from "react-router";

// const layoutRef = React.useRef<HTMLDivElement>(null);

const router = createHashRouter([
  {
    children: [
      {
        path: '*',
        Component: DashboardSidebar,
      },
    ],
  },
]);

test('Snapshot test DashboardSidebar', () => {
    const component = render(
        <RouterProvider router={router} />
    );
  expect(component).toMatchSnapshot();
});
