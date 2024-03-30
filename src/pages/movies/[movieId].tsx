import React from "react";
import { Box } from "@mui/material";
import { MovieCast, MovieList, MovieSummary } from "@/movies";

const MovieDetailsPage: React.FC = () => {
  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      gap="8px"
      className="overflow-y-auto"
    >
      <MovieSummary />
      <MovieCast />
      <MovieList title="Similar Movies" />
    </Box>
  );
};

export default MovieDetailsPage;
