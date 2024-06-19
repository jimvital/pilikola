import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { MovieList } from "@/movies";
import {
  getUser,
  getWatchlist,
  listWatchlistMovies,
  watchlistMoviesByWatchlistId,
} from "@/graphql/queries";
import {
  createUserMovies,
  deleteUserMovies,
  deleteWatchlist,
  deleteWatchlistMovies,
} from "@/graphql/mutations";

const WatchlistDetailsPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const {
    query: { watchlistId },
    push,
  } = useRouter();

  const [watchedMovies, setWatchedMovies] = useState<unknown[]>([]);
  const [isDeleteInProgress, setIsDeleteInProgress] = useState<boolean>(false);
  const [isWatchedInProgress, setIsWatchedInProgress] =
    useState<boolean>(false);

  const fetchWatchlistDetails = async () => {
    if (!watchlistId) return {};

    const client = generateClient();

    const {
      data: { getUser: currentUser },
    }: any = await client.graphql({
      query: getUser,
      variables: {
        cognitoId: userId,
      },
    });

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
      dbId: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      releaseDate: movie.releaseDate,
      rating: movie.rating,
    }));

    const watchedMovies = currentUser.allWatched.items
      .map((watched: any) => ({
        relationId: watched.id,
        tmdbId: watched.movie.tmdbId,
      }))
      .filter((watched: any) =>
        normalizedMovies.some(
          (watchlistMovie: any) => watchlistMovie.id === watched.tmdbId
        )
      );

    setWatchedMovies(watchedMovies);

    const averageRating =
      normalizedMovies.reduce(
        (acc: number, curr: Movie) => acc + curr.rating,
        0
      ) / normalizedMovies.length;

    return { ...watchlistDetails, movies: normalizedMovies, averageRating };
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

  const handleDelete = async () => {
    setIsDeleteInProgress(true);

    try {
      const client = generateClient();

      // Retrieve watchlist - movie connections
      const {
        data: {
          listWatchlistMovies: { items: allWatchlistMovies },
        },
      }: any = await client.graphql({
        query: listWatchlistMovies,
      });

      const watchlistMovies = watchlistDetails?.movies || [];

      // Delete watchlist - movie connections
      await Promise.all(
        watchlistMovies.map(async (movie) => {
          const movieToDelete = allWatchlistMovies.find(
            (temp: any) =>
              temp.movie.tmdbId === movie.id && temp.watchlistId === watchlistId
          );

          await client.graphql({
            query: deleteWatchlistMovies,
            variables: {
              input: {
                id: movieToDelete.id,
              },
            },
          });
        })
      );

      // Delete the rest of the watchlist
      await client.graphql({
        query: deleteWatchlist,
        variables: {
          input: {
            id: watchlistId,
          },
        },
      });

      push(`/`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteInProgress(false);
    }
  };

  const handleWatched = async (movie: Movie) => {
    setIsWatchedInProgress(true);

    try {
      const client = generateClient();

      const isWatched = normalizedWatchedMovies.includes(movie.id);

      if (isWatched) {
        const { relationId }: any = watchedMovies.find(
          (watched: any) => watched.tmdbId === movie.id
        );

        await client.graphql({
          query: deleteUserMovies,
          variables: {
            input: {
              id: relationId,
            },
          },
        });
      } else {
        await client.graphql({
          query: createUserMovies,
          variables: {
            input: {
              userCognitoId: userId,
              movieId: movie.dbId,
            },
          },
        });
      }

      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsWatchedInProgress(false);
    }
  };

  const normalizedWatchedMovies = useMemo(
    () => watchedMovies.map((watched: any) => watched.tmdbId),
    [watchedMovies]
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
          <Button variant="outlined" color="error" onClick={handleDelete}>
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
        watched={{ watchedMovies: normalizedWatchedMovies, handleWatched }}
      />
    </Box>
  );
};

export default WatchlistDetailsPage;
