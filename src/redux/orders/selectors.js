import { createSelector } from "@reduxjs/toolkit";
import { selectFilterName } from "../filters/slice";

export const selectOrders = (state) => state.orders.items;

export const selectFilteredOrdersMemo = createSelector(
  [selectOrders, selectFilterName],
  (orders, filter) => {
    return orders.filter((order) =>
      order.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
