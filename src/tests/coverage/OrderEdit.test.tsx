import * as React from "react";
import { render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { OrderEdit } from "../../components/tsx";
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
                    <MemoryRouter initialEntries={['/orders/1/edit']}>
                        <OrderEdit />
                    </MemoryRouter>
                </DialogsProvider>
            </NotificationsProvider>
        </AppTheme>
    )
});

test('Edit Order header is in OrderEdit', () => {
  expect(component.queryByText('Edit Order')).toBeDefined();
});

test('Name label is in OrderEdit', () => {
  const nameLabel = component.queryByLabelText('Name');
  expect(nameLabel).toBeDefined();
});

test('Client label is in OrderEdit', () => {
  const nameLabel = component.queryByLabelText('Client');
  expect(nameLabel).toBeDefined();
});

test('Price label is in OrderEdit', () => {
  const nameLabel = component.queryByLabelText('Price');
  expect(nameLabel).toBeDefined();
});

test('Status label is in OrderEdit', () => {
  const nameLabel = component.queryByLabelText('Status');
  expect(nameLabel).toBeDefined();
});

test('Is buying label is in OrderEdit', () => {
  const nameLabel = component.queryByLabelText('Is buying');
  expect(nameLabel).toBeDefined();
});

test('Back button is in OrderEdit', () => {
  expect(component.queryByText('Back')).toBeDefined();
});

test('Save button is in OrderEdit', () => {
  expect(component.queryByText('Save')).toBeDefined();
});