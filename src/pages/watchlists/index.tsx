import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { MyWatchlistsTable, PopularWatchlistsTable } from "@/watchlists";

const WatchlistsPage: React.FC = () => {
  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h4" gutterBottom>
        What to watch
      </Typography>
      <Typography variant="h5" gutterBottom>
        Popular
      </Typography>
      <PopularWatchlistsTable />
      <Divider className="mx-0 !my-[16px]" />
      <Typography variant="h5" gutterBottom>
        My lists
      </Typography>
      <MyWatchlistsTable />
    </Box>
  );
};

export default WatchlistsPage;
