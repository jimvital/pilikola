import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { ManageWatchlistMovies } from "@/watchlist";

const CreateWatchlistPage: React.FC = () => {
  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Typography variant="h4">Create a new watchlist</Typography>
      <TextField label="Name" margin="normal" />
      <TextField label="Description" margin="normal" multiline rows={4} />
      <ManageWatchlistMovies />
      <Button
        variant="contained"
        color="secondary"
        className="w-1/4 self-end mt-[16px]"
      >
        Create watchlist
      </Button>
    </Box>
  );
};

export default CreateWatchlistPage;
