import * as React from "react";
import { render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { OrderCreate } from "../../components/tsx";
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
                    <MemoryRouter initialEntries={['/orders/new']}>
                      <OrderCreate />
                    </MemoryRouter>
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    );
});

test('New Order header is in OrderCreate', () => {
  expect(component.getByText('New Order')).toBeDefined();
});

test('Name label is in OrderCreate', () => {
  const nameLabel = component.queryByLabelText('Name');
  expect(nameLabel).toBeDefined();
});

test('Client label is in OrderCreate', () => {
  const nameLabel = component.queryByLabelText('Client');
  expect(nameLabel).toBeDefined();
});

test('Price label is in OrderCreate', () => {
  const nameLabel = component.queryByLabelText('Price');
  expect(nameLabel).toBeDefined();
});

test('Status label is in OrderCreate', () => {
  const nameLabel = component.queryByLabelText('Status');
  expect(nameLabel).toBeDefined();
});

test('Is buying label is in OrderCreate', () => {
  const nameLabel = component.queryByLabelText('Is buying');
  expect(nameLabel).toBeDefined();
});

test('Back button is in OrderCreate', () => {
  expect(component.getByText('Back')).toBeDefined();
});

test('Create button is in OrderCreate', () => {
  expect(component.getByText('Create')).toBeDefined();
});