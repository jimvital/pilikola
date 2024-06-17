import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { ManageWatchlistMovies } from "@/watchlist";
import {
  createMovie,
  createWatchlist,
  createWatchlistMovies,
} from "@/graphql/mutations";
import { listMovies } from "@/graphql/queries";

const CreateWatchlistPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const [appliedMovies, setAppliedMovies] = useState<Movie[]>([]);
  const [watchlistName, setWatchlistName] = useState<string>("");
  const [watchlistDescription, setWatchlistDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsLoading(true);

    try {
      const client = generateClient();

      const {
        data: { createWatchlist: createdWatchlist },
      }: any = await client.graphql({
        query: createWatchlist,
        variables: {
          input: {
            name: watchlistName,
            description: watchlistDescription,
            userId,
          },
        },
      });

      const {
        data: {
          listMovies: { items: allMovies },
        },
      }: any = await client.graphql({
        query: listMovies,
      });

      appliedMovies.forEach(async (movie) => {
        const currentMovie = allMovies.find(
          (temp: any) => temp.tmdbId === movie.id
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
              watchlistId: createdWatchlist.id,
              movieId,
            },
          },
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isLoading ? <PageLoader /> : null}
      <Typography variant="h4">Create a new watchlist</Typography>
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
        disabled={!watchlistName}
        onClick={handleCreate}
      >
        Create watchlist
      </Button>
    </Box>
  );
};

export default CreateWatchlistPage;
