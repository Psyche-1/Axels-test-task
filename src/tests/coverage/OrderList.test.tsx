import * as React from "react";
import { render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { OrderList } from "../../components/tsx";
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

test('Orders header is in OrderList', () => {
  expect(component.queryAllByText('Orders')).toBeDefined();
});

test('ID label is in OrderList', () => {
  expect(component.queryByText('ID')).toBeDefined();
});

test('Order name label is in OrderList', () => {
  expect(component.queryByText('Order name')).toBeDefined();
});

test('Client label is in OrderList', () => {
  expect(component.queryByText('Client')).toBeDefined();
});

test('Price label is in OrderList', () => {
  expect(component.queryByText('Price')).toBeDefined();
});

test('Date label is in OrderList', () => {
  expect(component.queryByText('Date')).toBeDefined();
});

test('Status label is in OrderList', () => {
  expect(component.queryByText('Status')).toBeDefined();
});

test('Is buying label is in OrderList', () => {
  expect(component.queryByText('Is buying')).toBeDefined();
});
