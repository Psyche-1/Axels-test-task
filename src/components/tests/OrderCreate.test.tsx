import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { OrderCreate } from "../tsx";
import { createHashRouter, MemoryRouter, RouterProvider } from "react-router";
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
        Component: OrderCreate,
      },
    ],
  },
]);

test('Snapshot test OrderCreate', () => {
    const component = render(
        <AppTheme>
            <CssBaseline enableColorScheme />
            <NotificationsProvider>
                <DialogsProvider>
                    <GlobalStyles />
                    {/* <RouterProvider router={router} /> */}
                    <MemoryRouter initialEntries={['/orders/new']}>
                      <OrderCreate />
                    </MemoryRouter>
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    );
  expect(component).toMatchSnapshot();
});