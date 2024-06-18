import React from "react";
import Link from "next/link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const PopularWatchlistsTable: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.25,
      type: "custom",
      renderCell: ({ row }) => (
        <Link
          className="text-[#90caf9] hover:underline"
          href={`/watchlists/${row.id}`}
        >
          {row.name}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.75,
      sortable: false,
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
