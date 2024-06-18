import React from "react";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

import { watchlistsByUserId } from "@/graphql/queries";

const MyWatchlistsTable: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const router = useRouter();

  const fetchUserWatchlists = async () => {
    const client = generateClient();

    const {
      data: {
        watchlistsByUserId: { items: userWatchlists },
      },
    }: any = await client.graphql({
      query: watchlistsByUserId,
      variables: {
        userId,
      },
    });

    return userWatchlists;
  };

  const { data: watchlists, isLoading } = useQuery<Watchlist[]>({
    queryKey: ["watchlists-by-user", userId],
    queryFn: fetchUserWatchlists,
    initialData: [],
  });

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
      flex: 0.7,
      sortable: false,
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
      ],
    },
  ];

  return (
    <DataGrid
      autoHeight
      disableRowSelectionOnClick
      rows={watchlists}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      loading={isLoading}
    />
  );
};

export default MyWatchlistsTable;
