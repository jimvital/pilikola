import React, { useCallback, useContext, useMemo, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { List, Search } from "@mui/icons-material";
import { debounce } from "@mui/material/utils";

import { DrawerContext } from "./DrawerContext";

const Watchlists: React.FC = () => {
  const { watchlists } = useContext(DrawerContext);

  const [searchValue, setSearchValue] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((value: string) => setSearchValue(value), 500),
    []
  );

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
        disabled={watchlists.length === 0}
      />
      {watchlists.length === 0 ? (
        <Stack
          spacing={1}
          className="h-[180px] justify-center items-center opacity-25"
        >
          <List fontSize="large" />
          <Typography>Nothing to see here...</Typography>
        </Stack>
      ) : null}
      {watchlists.length > 0 && filteredWatchlists.length === 0 ? (
        <Stack spacing={1} className="h-[180px] justify-center items-center">
          <Typography className="opacity-25" variant="h6">
            No search results
          </Typography>
        </Stack>
      ) : null}
      {filteredWatchlists.map((watchlist) => (
        <Box
          key={watchlist.id}
          display="flex"
          gap="8px"
          alignItems="center"
          marginBottom="8px"
        >
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
