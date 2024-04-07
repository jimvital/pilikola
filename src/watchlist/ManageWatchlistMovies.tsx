import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

import WatchlistMovieItem from "./WatchlistMovieItem";
import AddMovieModal from "./AddMovieModal";

const ManageWatchlistMovies: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <AddMovieModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
      <Box display="flex" gap="4px" alignItems="center" marginBottom="8px">
        <Typography color="#BABABA">Movies</Typography>
        <IconButton color="primary" onClick={() => setOpenAddModal(true)}>
          <AddCircleOutline />
        </IconButton>
      </Box>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        gap="16px"
        padding="0 12px"
        className="overflow-y-auto"
      >
        <WatchlistMovieItem />
      </Box>
    </>
  );
};

export default ManageWatchlistMovies;
