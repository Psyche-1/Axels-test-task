import * as React from "react";
import { render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { OrderShow } from "../../components/tsx";
import { MemoryRouter } from "react-router";
import AppTheme from "../../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import NotificationsProvider from "../../hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "../../hooks/useDialogs/DialogsProvider";
import GlobalStyles from '../../GlobalStyles';

let component: ReturnType<typeof render>;

beforeEach(() => {
    component = render(
        <AppTheme>
            <CssBaseline enableColorScheme />
            <NotificationsProvider>
                <DialogsProvider>
                    <GlobalStyles />
                    <MemoryRouter initialEntries={['/orders/1']}>
                      <OrderShow />
                    </MemoryRouter>
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    );
});

test('Order header is in OrderShow', () => {
  expect(component.queryByText('Order')).toBeDefined();
});

test('Order name label is in OrderList', () => {
  expect(component.queryByText('Name')).toBeDefined();
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

test('Back button is in OrderForm', () => {
  expect(component.queryByText('Back')).toBeDefined();
});

test('Edit button is in OrderForm', () => {
  expect(component.queryByText('Edit')).toBeDefined();
});

test('Delete button is in OrderForm', () => {
  expect(component.queryByText('Delete')).toBeDefined();
});



