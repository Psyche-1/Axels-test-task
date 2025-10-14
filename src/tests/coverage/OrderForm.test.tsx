import * as React from "react";
import { render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
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

let component: ReturnType<typeof render>;

beforeEach(() => {
  component = render(
    <AppTheme>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
          <DialogsProvider>
              <GlobalStyles />
              <RouterProvider router={router} />
          </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  )
});

test('Order header is in OrderForm', () => {
  expect(component.queryByText('Order')).toBeDefined();
});

test('Name label is in OrderForm', () => {
  expect(component.queryByLabelText('Name')).toBeDefined();
});

test('Client label is in OrderForm', () => {
  expect(component.queryByLabelText('Client')).toBeDefined();
});

test('Price label is in OrderForm', () => {
  expect(component.queryByLabelText('Price')).toBeDefined();
});

test('Status label is in OrderForm', () => {
  expect(component.queryByLabelText('Status')).toBeDefined();
});

test('Is buying label is in OrderForm', () => {
  expect(component.queryByLabelText('Is buying')).toBeDefined();
});

test('Back button is in OrderForm', () => {
  expect(component.queryByText('Back')).toBeDefined();
});

test('Edit button is in OrderForm', () => {
  expect(component.queryByText('Edit')).toBeDefined();
});

test('Delete button is in OrderForm', () => {
  expect(component.queryByText('Delete')).toBeDefined();
});