import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

import WatchlistMovieItem from "./WatchlistMovieItem";
import AddMovieDialog from "./AddMovieDialog";

interface ManageWatchlistMoviesProps {
  appliedMovies: Movie[];
  setAppliedMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const ManageWatchlistMovies: React.FC<ManageWatchlistMoviesProps> = ({
  appliedMovies,
  setAppliedMovies,
}) => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  return (
    <>
      {openAddModal ? (
        <AddMovieDialog
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          appliedMovies={appliedMovies}
          setAppliedMovies={setAppliedMovies}
        />
      ) : null}
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
        {appliedMovies.map((movie) => (
          <WatchlistMovieItem
            key={movie.id}
            data={movie}
            onDelete={() => {
              setAppliedMovies((prev) => {
                return prev.filter(({ id }) => id !== movie?.id);
              });
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default ManageWatchlistMovies;
