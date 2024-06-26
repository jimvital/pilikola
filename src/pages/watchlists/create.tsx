import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, TextField, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { SnackbarContext } from "@/common/Snackbar";
import { ManageWatchlistMovies } from "@/watchlist";

const CreateWatchlistPage: React.FC = () => {
  const {
    user: { userId },
  } = useAuthenticator((context) => [context.user]);

  const { push } = useRouter();

  const { handleOpenSnackbar } = useContext(SnackbarContext);

  const [appliedMovies, setAppliedMovies] = useState<Movie[]>([]);
  const [watchlistName, setWatchlistName] = useState<string>("");
  const [watchlistDescription, setWatchlistDescription] = useState<string>("");

  const postWatchlist = async () => {
    const response = await fetch("/api/watchlist/create", {
      method: "POST",
      body: JSON.stringify({
        watchlistName,
        watchlistDescription,
        userId,
        appliedMovies,
      }),
    });

    return response;
  };

  const { mutate: handleCreate, isPending } = useMutation({
    mutationKey: ["create"],
    mutationFn: postWatchlist,
    onSuccess: () => {
      handleOpenSnackbar("success", "Successfully created watchlist!");

      push(`/watchlists`);
    },
    onError: () => {
      handleOpenSnackbar("error", "Failed to create watchlist");
    },
  });

  return (
    <Box
      height="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isPending ? <PageLoader /> : null}
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
        onClick={() => handleCreate()}
      >
        Create watchlist
      </Button>
    </Box>
  );
};

export default CreateWatchlistPage;
