import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

import { ManageWatchlistMovies } from "@/watchlist";
import { useRouter } from "next/navigation";
import { ArrowBackIosNew } from "@mui/icons-material";

const EditWatchlistPage: React.FC = () => {
  const data = {
    name: "Watchlist name",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  };
  const router = useRouter();

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Box display="flex" gap="16px">
        <IconButton
          color="primary"
          onClick={() => router.push("/watchlist/w1")}
        >
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4">{`Edit "watchlist name"`}</Typography>
      </Box>
      <TextField label="Name" margin="normal" defaultValue={data.name} />
      <TextField
        label="Description"
        margin="normal"
        multiline
        rows={4}
        defaultValue={data.description}
      />
      <ManageWatchlistMovies />
      <Button
        variant="contained"
        color="secondary"
        className="w-1/4 self-end mt-[16px]"
      >
        Save watchlist
      </Button>
    </Box>
  );
};

export default EditWatchlistPage;
