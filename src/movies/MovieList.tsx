import React from "react";
import { Box, Typography } from "@mui/material";

import MovieCard from "./MovieCard";

interface MovieListProps {
  className?: string;
  title?: string;
}

const MovieList: React.FC<MovieListProps> = ({ className, title }) => {
  return (
    <Box>
      {title ? (
        <Typography variant="body1" fontWeight="bold" marginBottom="16px">
          {title}
        </Typography>
      ) : null}
      <Box display="flex" gap="24px" className={className}>
        <MovieCard />
      </Box>
    </Box>
  );
};

export default MovieList;
