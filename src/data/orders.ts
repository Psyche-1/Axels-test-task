import { useSelector } from "react-redux";
import { selectFilteredOrdersMemo } from "../redux/orders/selectors";
import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

type OrderStatus = 'Market' | 'Finance' | 'Development' | 'Business';

export interface Order {
  id: number;
  name: string;
  client: string;
  price: number;
  date: string;
  status: OrderStatus;
  isBuying: boolean;
}

const INITIAL_ORDERS_STORE: Order[] = [
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

export function getOrdersFromServer() {
  const filteredOrders = useSelector(selectFilteredOrdersMemo);

  return filteredOrders;
}

export function getOrdersStore(): Order[] {
  const stringifiedOrders = localStorage.getItem('orders-store');
  return stringifiedOrders ? JSON.parse(stringifiedOrders) : INITIAL_ORDERS_STORE;
}

export function setOrdersStore(orders: Order[]) {
  return localStorage.setItem('orders-store', JSON.stringify(orders));
}

export async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Order[]; itemCount: number }> {
  const ordersStore = getOrdersStore();
  // const ordersStore = getOrdersFromServer();

  let filteredOrders = [...ordersStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredOrders = filteredOrders.filter((order) => {
        const orderValue = order[field as keyof Order];

        switch (operator) {
          case 'contains':
            return String(orderValue).toLowerCase().includes(String(value).toLowerCase());
          case 'equals':
            return orderValue === value;
          case 'startsWith':
            return String(orderValue).toLowerCase().startsWith(String(value).toLowerCase());
          case 'endsWith':
            return String(orderValue).toLowerCase().endsWith(String(value).toLowerCase());
          case '>':
            return orderValue > value;
          case '<':
            return orderValue < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredOrders.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field as keyof Order] < b[field as keyof Order]) {
          return sort === 'asc' ? -1 : 1;
        }
        if (a[field as keyof Order] > b[field as keyof Order]) {
          return sort === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedOrders = filteredOrders.slice(start, end);

  return {
    items: paginatedOrders,
    itemCount: filteredOrders.length,
  };
}

export async function getOne(orderId: number) {
  const ordersStore = getOrdersStore();

  const orderToShow = ordersStore.find((order) => order.id === orderId);

  if (!orderToShow) {
    throw new Error('Order not found');
  }
  return orderToShow;
}

export async function createOne(data: Omit<Order, 'id'>) {
  const ordersStore = getOrdersStore();

  const newOrder = {
    id: ordersStore.reduce((max, order) => Math.max(max, order.id), 0) + 1,
    ...data,
  };

  setOrdersStore([...ordersStore, newOrder]);

  return newOrder;
}

export async function updateOne(orderId: number, data: Partial<Omit<Order, 'id'>>) {
  const ordersStore = getOrdersStore();

  let updatedOrder: Order | null = null;

  setOrdersStore(
    ordersStore.map((order) => {
      if (order.id === orderId) {
        updatedOrder = { ...order, ...data };
        return updatedOrder;
      }
      return order;
    }),
  );

  if (!updatedOrder) {
    throw new Error('Order not found');
  }
  return updatedOrder;
}

export async function deleteOne(orderId: number) {
  const ordersStore = getOrdersStore();

  setOrdersStore(ordersStore.filter((order) => order.id !== orderId));
}

// Validation follows the [Standard Schema](https://standardschema.dev/).

type ValidationResult = { issues: { message: string; path: (keyof Order)[] }[] };

export function validate(order: Partial<Order>): ValidationResult {
  let issues: ValidationResult['issues'] = [];

  if (!order.name) {
    issues = [...issues, { message: 'Name is required', path: ['name'] }];
  }

  if (!order.price) {
    issues = [...issues, { message: 'Price is required', path: ['price'] }];
  } else if (order.price < 1) {
    issues = [...issues, { message: 'Price must be at least 1', path: ['price'] }];
  }

  if (!order.date) {
    issues = [...issues, { message: 'Date is required', path: ['date'] }];
  }

  if (!order.status) {
    issues = [...issues, { message: 'Role is required', path: ['status'] }];
  } else if (!['Market', 'Finance', 'Development', 'Business'].includes(order.status)) {
    issues = [
      ...issues,
      { message: 'Status must be "Market", "Finance", "Business" or "Development"', path: ['status'] },
    ];
  }

  return { issues };
}