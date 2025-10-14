import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { OrderForm } from "../../components/tsx";
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
        element: <OrderForm
                        formState={{values: { status: "Business", isBuying: true}, errors: {}} }
                        onFieldChange={() => {}}
                        onSubmit={() => {}}
                        onReset={() => {}}
                        submitButtonLabel="Create"
                    />,
      },
    ],
  },
]);

test('Snapshot test OrderForm', () => {
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