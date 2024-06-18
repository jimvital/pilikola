import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Search } from "@mui/icons-material";
import { debounce } from "@mui/material/utils";

import { watchlistsByUserId } from "@/graphql/queries";

const Watchlists: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const [searchValue, setSearchValue] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((value: string) => setSearchValue(value), 500),
    []
  );

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

  const { data: watchlists } = useQuery<Watchlist[]>({
    queryKey: ["watchlists-by-user", userId],
    queryFn: fetchUserWatchlists,
    initialData: [],
  });

  const filteredWatchlists = useMemo(
    () =>
      watchlists.filter((watchlist) =>
        watchlist.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [watchlists, searchValue]
  );

  return (
    <>
      <Divider className="mx-0 !my-[16px]" />
      <Typography>My Lists</Typography>
      <TextField
        placeholder="Search"
        size="small"
        margin="normal"
        InputProps={{
          type: "search",
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
      />
      {filteredWatchlists.map((watchlist) => (
        <Box key={watchlist.id} display="flex" gap="8px" alignItems="center">
          <Avatar className="w-[24px] h-[24px] text-sm">
            {watchlist.name[0]}
          </Avatar>
          <Link
            className="text-[#90caf9] hover:underline"
            href={`/watchlists/${watchlist.id}`}
          >
            {watchlist.name}
          </Link>
        </Box>
      ))}
    </>
  );
};

export default Watchlists;
