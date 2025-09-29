import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/operations";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(`/orders`);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/orders/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post(`/orders`, body);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
