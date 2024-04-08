import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import { MovieList } from "@/movies";

const WatchlistDetailsPage: React.FC = () => {
  const [watchedMovies, setWatchedMovies] = useState<unknown[]>([]);

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h4">Watchlist name</Typography>
      <MovieList watched={{ watchedMovies, setWatchedMovies }} />
    </Box>
  );
};

export default WatchlistDetailsPage;
