import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

import { PageLoader } from "@/common";
import { SnackbarContext } from "@/common/Snackbar";
import { ManageWatchlistMovies } from "@/watchlist";

const EditWatchlistPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const {
    query: { watchlistId },
    back,
    push,
  } = useRouter();

  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [appliedMovies, setAppliedMovies] = useState<Movie[]>([]);
  const [watchlistName, setWatchlistName] = useState<string>("");
  const [watchlistDescription, setWatchlistDescription] = useState<string>("");

  const fetchWatchlistDetails = async () => {
    if (!watchlistId) return {};

    const response = await fetch(`/api/watchlist/${watchlistId}`, {
      method: "GET",
    });

    const watchlistDetails = await response.json();

    setWatchlistName(watchlistDetails?.name);
    setWatchlistDescription(watchlistDetails?.description);
    setAppliedMovies(watchlistDetails?.movies);

    return watchlistDetails;
  };

  const { data: watchlistDetails, isFetching } = useQuery<Watchlist>({
    queryKey: ["watchlists", watchlistId],
    queryFn: fetchWatchlistDetails,
  });

  const patchWatchlist = async () => {
    const response = await fetch(
      `/api/watchlist/${watchlistId}?userId=${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          watchlistName,
          watchlistDescription,
          watchlistMovies: watchlistDetails?.movies,
          appliedMovies,
        }),
      }
    );

    return response;
  };

  const { mutate: handleEdit, isPending: isEditInProgress } = useMutation({
    mutationKey: ["edit", watchlistId],
    mutationFn: patchWatchlist,
    onSuccess: () => {
      handleOpenSnackbar("success", "Successfully edited watchlist!");

      push(`/watchlists/${watchlistId}`);
    },
    onError: () => {
      handleOpenSnackbar("error", "Failed to edit watchlist");
    },
  });

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isFetching || isEditInProgress ? <PageLoader /> : null}
      <Box display="flex" gap="16px">
        <IconButton color="primary" onClick={() => back()}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4">{`Editing "${watchlistDetails?.name}" watchlist`}</Typography>
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
        onClick={() => handleEdit()}
      >
        Save watchlist
      </Button>
    </Box>
  );
};

export default EditWatchlistPage;
