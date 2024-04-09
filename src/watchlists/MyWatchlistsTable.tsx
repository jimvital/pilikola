import React from "react";
import { useRouter } from "next/router";
import { Link } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const MyWatchlistsTable: React.FC = () => {
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.2,
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
    {
      field: "actions",
      type: "actions",
      flex: 0.05,
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="edit"
          icon={<Edit />}
          label="Edit"
          onClick={() => router.push(`/watchlists/edit/${id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete />}
          label="Delete"
          onClick={() => {}}
          showInMenu
        />,
      ],
    },
  ];

  const rows = [
    {
      id: "w1",
      name: "Watchlist name",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
  ];

  return (
    <DataGrid
      autoHeight
      disableRowSelectionOnClick
      checkboxSelection
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      onRowSelectionModelChange={() => {}}
    />
  );
};

export default MyWatchlistsTable;
