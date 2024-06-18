import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { generateClient } from "aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, List, Search } from "@mui/icons-material";
import { debounce } from "@mui/material/utils";

import { PageLoader } from "@/common";
import { listMovies, watchlistsByUserId } from "@/graphql/queries";
import { createMovie, createWatchlistMovies } from "@/graphql/mutations";

interface ISelectAddToWatchlist {
  value: string;
  disabled: boolean;
}

interface AddToWatchlistModalProps {
  movie: Movie;
  open: boolean;
  onClose: () => void;
}

const AddToWatchlistModal: React.FC<AddToWatchlistModalProps> = ({
  movie,
  open,
  onClose,
}) => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const [selectedItems, setSelectedItems] = useState<ISelectAddToWatchlist[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddInProgress, setIsAddInProgress] = useState<boolean>(false);

  const validSelectedItems = selectedItems.filter(
    (selected) => !selected.disabled
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((value: string) => setSearchValue(value), 500),
    []
  );

  const fetchUserWatchlists = async () => {
    const client = generateClient();

    const {
      data: {
        watchlistsByUserId: { items: userWatchlists },
      },
    }: any = await client.graphql({
      query: watchlistsByUserId,
      variables: {
        userId,
      },
    });

    const {
      data: {
        listMovies: { items: filteredMovies },
      },
    }: any = await client.graphql({
      query: listMovies,
      variables: {
        filter: { tmdbId: { eq: movie.id } },
      },
    });

    const listedIn =
      filteredMovies.length > 0 ? filteredMovies[0].listedIn.items : [];

    const movieListedIn = listedIn.map((listed: any) => ({
      value: listed.watchlistId,
      disabled: true,
    }));

    setSelectedItems([...movieListedIn]);

    return userWatchlists;
  };

  const { data: watchlists, isLoading } = useQuery<Watchlist[]>({
    queryKey: ["watchlists-by-user-movie", userId, movie.id],
    queryFn: fetchUserWatchlists,
    initialData: [],
  });

  const filteredWatchlists = useMemo(
    () =>
      watchlists.filter((watchlist) =>
        watchlist.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [watchlists, searchValue]
  );

  const handleAdd = async () => {
    setIsAddInProgress(true);

    try {
      const client = generateClient();

      const {
        data: {
          listMovies: { items: allMovies },
        },
      }: any = await client.graphql({
        query: listMovies,
      });

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

      await Promise.all(
        selectedItems.map(async (selected) => {
          await client.graphql({
            query: createWatchlistMovies,
            variables: {
              input: {
                watchlistId: selected.value,
                movieId,
              },
            },
          });
        })
      );

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddInProgress(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {isLoading || isAddInProgress ? <PageLoader /> : null}
      <DialogTitle>{`Adding "${movie.title}"`}</DialogTitle>
      <IconButton onClick={onClose} className="!absolute top-[8px] right-[8px]">
        <Close />
      </IconButton>
      <DialogContent className="px-[24px] pt-0 pb-[10px]">
        <TextField
          placeholder="Search"
          margin="normal"
          variant="standard"
          fullWidth
          InputProps={{
            type: "search",
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          disabled={watchlists.length === 0}
        />
        {watchlists.length === 0 ? (
          <Stack spacing={1} className="h-[320px] justify-center items-center">
            <List className="opacity-25" fontSize="large" />
            <Typography className="opacity-25" variant="h6">
              Nothing to see here...
            </Typography>
            <Link
              className="text-[#90caf9] underline"
              href={`/watchlists/create`}
            >
              Create watchlist
            </Link>
          </Stack>
        ) : null}
        {watchlists.length > 0 && filteredWatchlists.length === 0 ? (
          <Stack spacing={1} className="h-[320px] justify-center items-center">
            <Typography className="opacity-25" variant="h6">
              No search results
            </Typography>
          </Stack>
        ) : null}
        <Box className="max-h-[400px] overflow-y-auto">
          {filteredWatchlists.map((watchlist) => {
            const currentSelected = selectedItems.find(
              (selected) => selected.value === watchlist.id
            );
            const checked = currentSelected !== undefined;

            return (
              <Box
                key={watchlist.id}
                display="flex"
                gap="8px"
                alignItems="center"
              >
                <Checkbox
                  checked={checked}
                  onChange={() => {
                    if (checked) {
                      setSelectedItems((prev) =>
                        prev.filter(
                          (prevSelected) => watchlist.id !== prevSelected.value
                        )
                      );
                    } else {
                      setSelectedItems((prev) => [
                        ...prev,
                        { value: watchlist.id, disabled: false },
                      ]);
                    }
                  }}
                  disabled={currentSelected?.disabled}
                />
                <Typography>{watchlist.name}</Typography>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          disabled={validSelectedItems.length === 0}
          onClick={handleAdd}
        >
          Add ({`${validSelectedItems.length} watchlist/s selected`})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToWatchlistModal;
