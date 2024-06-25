import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { PageLoader } from "@/common";
import { MovieCast, MovieList, MovieSummary } from "@/movies";

const MovieDetailsPage: React.FC = () => {
  const {
    query: { movieId },
  } = useRouter();

  const fetchMovieDetails = async () => {
    if (!movieId) return {};

    const response = await fetch(`/api/movies/${movieId}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  };

  const { data: movieDetails, isFetching } = useQuery<MovieDetails>({
    queryKey: ["movies", movieId],
    queryFn: fetchMovieDetails,
  });

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      gap="8px"
      className="overflow-y-auto"
    >
      {isFetching ? <PageLoader /> : null}
      <MovieSummary movieDetails={movieDetails || ({} as MovieDetails)} />
      <MovieCast movieCast={movieDetails?.cast || []} />
      <MovieList
        title="Recommended"
        className="flex-wrap overflow-y-auto"
        movies={movieDetails?.recommendations}
      />
    </Box>
  );
};

export default MovieDetailsPage;
