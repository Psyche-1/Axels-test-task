import Chip from "@mui/material/Chip";

function renderStatus(status) {
  const colors = {
    Purchased: "success",
    AwaitingDelivery: "default",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

export const columns = [
  { field: "orderTitle", headerName: "Order Title", flex: 1.5, minWidth: 200 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    minWidth: 150,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: "client",
    headerName: "Client",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "date",
    headerName: "Date",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "price",
    headerName: "Price",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
  },
];

export const rows = [
  {
    id: 1,
    orderTitle: "Smartphone",
    status: "Purchased",
    client: "John Doe",
    date: "23.09.2025",
    price: 7000,
  },
  {
    id: 2,
    orderTitle: "Car",
    status: "AwaitingDelivery",
    client: "Henry Ford",
    date: "22.09.2025",
    price: 7000000,
  },
];
