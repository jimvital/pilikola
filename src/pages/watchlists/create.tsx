import React, { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Box, Button, TextField, Typography } from "@mui/material";

import { ManageWatchlistMovies } from "@/watchlist";
import { createWatchlist } from "@/graphql/mutations";

const CreateWatchlistPage: React.FC = () => {
  const [appliedMovies, setAppliedMovies] = useState<Movie[]>([]);
  const [watchlistName, setWatchlistName] = useState<string>("");
  const [watchlistDescription, setWatchlistDescription] = useState<string>("");

  const handleCreate = async () => {
    const client = generateClient();

    // TODO: Continue watchlist creation and connection to movie and user
    await client.graphql({
      query: createWatchlist,
      variables: {
        input: {
          name: watchlistName,
          description: watchlistDescription,
        },
      },
    });
  };

  return (
    <Box
      height="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
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
