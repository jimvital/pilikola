import React from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";

const WatchlistsPage: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h4">What to watch</Typography>
      <Typography variant="h5">Popular</Typography>
      <Typography variant="h5">My lists</Typography>
    </Box>
  );
};

export default WatchlistsPage;
