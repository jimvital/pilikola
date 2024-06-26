import React, { useCallback, useContext, useMemo, useState } from "react";
import Link from "next/link";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { SnackbarContext } from "@/common/Snackbar";

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

  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [selectedItems, setSelectedItems] = useState<ISelectAddToWatchlist[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const validSelectedItems = selectedItems.filter(
    (selected) => !selected.disabled
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((value: string) => setSearchValue(value), 500),
    []
  );

  const fetchUserWatchlistsWithMovie = async () => {
    const response = await fetch(
      `/api/user/watchlists-with-movies?userId=${userId}&movieId=${movie.id}`,
      {
        method: "GET",
      }
    );

    const { userWatchlists, listedIn } = await response.json();

    const movieListedIn = listedIn.map((listed: any) => ({
      value: listed.watchlistId,
      disabled: true,
    }));

    setSelectedItems([...movieListedIn]);

    return userWatchlists;
  };

  const { data: watchlists, isFetching } = useQuery<Watchlist[]>({
    queryKey: ["watchlists-with-user-movie", userId, movie.id],
    queryFn: fetchUserWatchlistsWithMovie,
    initialData: [],
  });

  const filteredWatchlists = useMemo(
    () =>
      watchlists.filter((watchlist) =>
        watchlist.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [watchlists, searchValue]
  );

  const postAddToWatchlist = async () => {
    const response = await fetch(`/api/movies/add-to-watchlist`, {
      method: "POST",
      body: JSON.stringify({
        movie,
        selectedItems,
      }),
    });

    return response;
  };

  const { mutate: handleAdd, isPending: isAddInProgress } = useMutation({
    mutationKey: ["add-to-watchlist", movie.id],
    mutationFn: postAddToWatchlist,
    onSuccess: () => {
      handleOpenSnackbar("success", "Successfully added movie to watchlist/s!");

      onClose();
    },
    onError: () => {
      handleOpenSnackbar("error", "Failed to add movie to watchlist/s");
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {isFetching || isAddInProgress ? <PageLoader /> : null}
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
          onClick={() => handleAdd()}
        >
          Add ({`${validSelectedItems.length} watchlist/s selected`})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToWatchlistModal;
