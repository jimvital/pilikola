import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { MovieList } from "@/movies";

const WatchlistDetailsPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const {
    query: { watchlistId },
    push,
  } = useRouter();

  const [watchedMovies, setWatchedMovies] = useState<unknown[]>([]);

  const fetchWatchlistDetails = async () => {
    if (!watchlistId) return {};

    const response = await fetch(
      `/api/watchlist/${watchlistId}?userId=${userId}`,
      {
        method: "GET",
      }
    );

    const watchlistDetails = await response.json();

    setWatchedMovies(watchlistDetails.watchedMovies);

    return watchlistDetails;
  };

  const {
    data: watchlistDetails,
    isFetching,
    refetch,
  } = useQuery<Watchlist>({
    queryKey: ["watchlists", watchlistId],
    queryFn: fetchWatchlistDetails,
  });

  const getAverageRating = () => {
    if (!watchlistDetails?.averageRating) return "N/A";

    return `${watchlistDetails.averageRating.toFixed(1)} / 5`;
  };

  const deleteWatchlist = async () => {
    const response = await fetch(`/api/watchlist/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        watchlistId,
        watchlistMovies: watchlistDetails?.movies,
      }),
    });

    return response;
  };

  const { mutate: handleDelete, isPending: isDeleteInProgress } = useMutation({
    mutationKey: ["delete", watchlistId],
    mutationFn: deleteWatchlist,
    onSuccess: () => {
      push(`/watchlists`);
    },
  });

  const postWatch = async (movie: Movie) => {
    const isWatched = normalizedWatchedMovies.includes(movie.id);

    const response = await fetch(`/api/movies/watch`, {
      method: "POST",
      body: JSON.stringify({
        movie,
        isWatched,
        watchedMovies,
        userId,
      }),
    });

    return response;
  };

  const normalizedWatchedMovies = useMemo(
    () => watchedMovies.map((watched: any) => watched.tmdbId),
    [watchedMovies]
  );

  const { mutate: handleWatched, isPending: isWatchedInProgress } = useMutation(
    {
      mutationKey: ["watch", watchlistId],
      mutationFn: postWatch,
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isFetching || isDeleteInProgress || isWatchedInProgress ? (
        <PageLoader />
      ) : null}
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
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete()}
          >
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
              Watched Count
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {watchedMovies.length ?? "N/A"}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Total Movie Count
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {watchlistDetails?.movies?.length ?? "N/A"}
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
        className="flex-wrap overflow-y-auto"
        watched={{ watchedMovies: normalizedWatchedMovies, handleWatched }}
      />
    </Box>
  );
};

export default WatchlistDetailsPage;
