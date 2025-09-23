import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "../internals/data/orderData";
import { useNavigate } from 'react-router';

export default function DashboardTable() {
  const navigate = useNavigate();

  const handleRowClick = React.useCallback(
    ({ row }) => {
      navigate(`/orders/${row.id}`);
    },
    [navigate],
);
  
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[1, 20, 50]}
      disableColumnResize
      disableRowSelectionOnClick
      onRowClick={handleRowClick}
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
    />
  );
}
