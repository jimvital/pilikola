import React, { useState } from "react";
import { useRouter } from "next/router";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

import { PageLoader } from "@/common";
import { ManageWatchlistMovies } from "@/watchlist";
import {
  getWatchlist,
  listWatchlistMovies,
  watchlistMoviesByWatchlistId,
} from "@/graphql/queries";
import {
  createMovie,
  createWatchlistMovies,
  deleteWatchlistMovies,
  updateWatchlist,
} from "@/graphql/mutations";

const EditWatchlistPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const {
    query: { watchlistId },
    back,
    push,
  } = useRouter();

  const [appliedMovies, setAppliedMovies] = useState<Movie[]>([]);
  const [watchlistName, setWatchlistName] = useState<string>("");
  const [watchlistDescription, setWatchlistDescription] = useState<string>("");
  const [isEditInProgress, setIsEditInProgress] = useState<boolean>(false);

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

    setWatchlistName(watchlistDetails?.name);
    setWatchlistDescription(watchlistDetails?.description);
    setAppliedMovies(normalizedMovies);

    return { ...watchlistDetails, movies: normalizedMovies };
  };

  const { data: watchlistDetails, isLoading } = useQuery<Watchlist>({
    queryKey: ["watchlists", watchlistId],
    queryFn: fetchWatchlistDetails,
  });

  const handleEdit = async () => {
    setIsEditInProgress(true);

    try {
      const client = generateClient();

      // Update initial watchlist info
      await client.graphql({
        query: updateWatchlist,
        variables: {
          input: {
            id: watchlistId,
            name: watchlistName,
            description: watchlistDescription,
            userId,
          },
        },
      });

      // Retrieve watchlist - movie connections
      const {
        data: {
          listWatchlistMovies: { items: allWatchlistMovies },
        },
      }: any = await client.graphql({
        query: listWatchlistMovies,
      });

      const prevWatchlistMovies = watchlistDetails?.movies || [];

      appliedMovies.forEach(async (movie) => {
        // Do not create new watchlist - movie connection if already existing
        const isExisting = !!prevWatchlistMovies.find(
          (prev) => prev.id === movie.id
        );

        if (isExisting) return;

        const currentMovie = allWatchlistMovies.find(
          (temp: any) => temp.movie.tmdbId === movie.id
        );

        let movieId = "";

        if (!currentMovie) {
          const {
            data: { createMovie: createdMovie },
          }: any = await client.graphql({
            query: createMovie,
            variables: {
              input: {
                tmdbId: movie.id,
                title: movie.title,
                releaseDate: movie.releaseDate,
                rating: movie.rating,
                posterUrl: movie.posterUrl,
              },
            },
          });

          movieId = createdMovie.id;
        } else {
          movieId = currentMovie.id;
        }

        await client.graphql({
          query: createWatchlistMovies,
          variables: {
            input: {
              watchlistId,
              movieId,
            },
          },
        });
      });

      // Delete watchlist - movie connection based on edited selections
      const watchlistMoviesToDelete = prevWatchlistMovies.filter((movie) => {
        const isExisting = appliedMovies.find(
          (applied) => applied.id === movie.id
        );

        return !isExisting;
      });

      watchlistMoviesToDelete.forEach(async (movie) => {
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
      });

      push(`/watchlists/${watchlistId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditInProgress(false);
    }
  };

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isLoading || isEditInProgress ? <PageLoader /> : null}
      <Box display="flex" gap="16px">
        <IconButton color="primary" onClick={() => back()}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4">{`Edit "${watchlistDetails?.name}"`}</Typography>
      </Box>
      <TextField
        label="Name"
        margin="normal"
        value={watchlistName}
        onChange={(event) => {
          setWatchlistName(event.target.value);
        }}
      />
      <TextField
        label="Description"
        margin="normal"
        multiline
        rows={4}
        value={watchlistDescription}
        onChange={(event) => {
          setWatchlistDescription(event.target.value);
        }}
      />
      <ManageWatchlistMovies
        appliedMovies={appliedMovies}
        setAppliedMovies={setAppliedMovies}
      />
      <Button
        variant="contained"
        color="secondary"
        className="w-1/4 self-end !mt-[16px]"
        onClick={handleEdit}
      >
        Save watchlist
      </Button>
    </Box>
  );
};

export default EditWatchlistPage;
