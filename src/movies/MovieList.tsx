import React from "react";
import { Box } from "@mui/material";

import MovieCard from "./MovieCard";

const MovieList: React.FC = () => {
  return (
    <Box display="flex" gap="24px" flex="1" className="overflow-y-auto">
      <MovieCard />
      <MovieCard />
    </Box>
  );
};

export default MovieList;
