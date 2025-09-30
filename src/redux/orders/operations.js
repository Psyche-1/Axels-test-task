import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
  baseURL: "",
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      let { data } = await api.get(`/orders`);

      data = [
        {
          id: 1,
          name: "Smartphone",
          client: "Steve Jobs",
          price: 7000,
          date: "2007-01-01T00:00:00.000Z",
          status: "Market",
          isBuying: true,
        },
        {
          id: 2,
          name: "Car",
          client: "Henry Ford",
          price: 70000,
          date: "1908-01-01T00:00:00.000Z",
          status: "Finance",
          isBuying: false,
        },
        {
          id: 3,
          name: "Plane",
          client: "Brothers Wright",
          price: 7000000,
          date: "1906-05-22T00:00:00.000Z",
          status: "Development",
          isBuying: true,
        },
        {
          id: 4,
          name: "Rocket",
          client: "Elon Musk",
          price: 70000000,
          date: "2008-09-01T00:00:00.000Z",
          status: "Business",
          isBuying: false,
        },
      ];

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
