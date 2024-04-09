import React from "react";
import { Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const PopularWatchlistsTable: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.25,
      type: "custom",
      resizable: true,
      renderCell: ({ row }) => (
        <Link href={`/watchlists/${row.id}`}>{row.name}</Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.75,
      sortable: false,
      resizable: false,
    },
  ];

  const rows = [
    {
      id: "imdb-top",
      name: "IMDb Top 10 Movies",
      description: "As rated by regular IMDb voters.",
    },
  ];

  return (
    <DataGrid
      autoHeight
      disableRowSelectionOnClick
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
};

export default PopularWatchlistsTable;