import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { OrderList } from "../tsx";
import { createHashRouter, RouterProvider } from "react-router";
import AppTheme from "../../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import NotificationsProvider from "../../hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "../../hooks/useDialogs/DialogsProvider";
import GlobalStyles from '../../GlobalStyles';

const router = createHashRouter([
  {
    children: [
      {
        path: '*',
        Component: OrderList,
      },
    ],
  },
]);

test('Snapshot test OrderList', () => {
    const component = render(
        <AppTheme>
            <CssBaseline enableColorScheme />
            <NotificationsProvider>
                <DialogsProvider>
                    <GlobalStyles />
                    <RouterProvider router={router} />
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    );
  expect(component).toMatchSnapshot();
});