import * as React from "react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { OrderEdit } from "../tsx";
import { createHashRouter, MemoryRouter, RouterProvider } from "react-router";
import AppTheme from "../../shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import NotificationsProvider from "../../hooks/useNotifications/NotificationsProvider";
import DialogsProvider from "../../hooks/useDialogs/DialogsProvider";
import GlobalStyles from '../../GlobalStyles';

test('Snapshot test OrderEdit', () => {
    const component = render(
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
    );
  expect(component).toMatchSnapshot();
});