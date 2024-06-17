import React, { useState } from "react";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { MovieList } from "@/movies";
import { getWatchlist, watchlistMoviesByWatchlistId } from "@/graphql/queries";

const WatchlistDetailsPage: React.FC = () => {
  const {
    query: { watchlistId },
    push,
  } = useRouter();

  const [watchedMovies, setWatchedMovies] = useState<unknown[]>([]);

  const fetchWatchlistDetails = async () => {
    if (!watchlistId) return {};

    const client = generateClient();

    const {
      data: { getWatchlist: watchlistDetails },
    }: any = await client.graphql({
      query: getWatchlist,
      variables: {
        id: watchlistId,
      },
    });
    const {
      data: {
        watchlistMoviesByWatchlistId: { items: watchlistMovies },
      },
    }: any = await client.graphql({
      query: watchlistMoviesByWatchlistId,
      variables: {
        watchlistId,
      },
    });

    const normalizedMovies = watchlistMovies.map(({ movie }: any) => ({
      id: movie.tmdbId,
      title: movie.title,
      posterUrl: movie.posterUrl,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    }));

    const averageRating =
      normalizedMovies.reduce(
        (acc: number, curr: Movie) => acc + curr.rating,
        0
      ) / normalizedMovies.length;

    return { ...watchlistDetails, movies: normalizedMovies, averageRating };
  };

  const { data: watchlistDetails, isLoading } = useQuery<Watchlist>({
    queryKey: ["watchlists", watchlistId],
    queryFn: fetchWatchlistDetails,
  });

  const getAverageRating = () => {
    if (!watchlistDetails?.averageRating) return "N/A";

    return `${watchlistDetails.averageRating.toFixed(1)} / 5`;
  };

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isLoading ? <PageLoader /> : null}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          {watchlistDetails?.name}
        </Typography>
        <Box display="flex" gap="12px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => push(`/watchlists/edit/${watchlistId}`)}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      </Box>
      <Typography variant="body1" fontWeight="bold">
        Description
      </Typography>
      <Typography variant="body2">{watchlistDetails?.description}</Typography>
      <br />
      <Box display="flex" gap="24px">
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Movie Count
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {watchlistDetails?.movies?.length || "N/A"}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Average Rating
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {getAverageRating()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <br />
      <MovieList
        movies={watchlistDetails?.movies}
        watched={{ watchedMovies, setWatchedMovies }}
      />
    </Box>
  );
};

export default WatchlistDetailsPage;
