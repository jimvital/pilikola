import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

interface WatchlistMovieItemProps {
  data: Movie;
  onDelete: () => void;
}

const WatchlistMovieItem: React.FC<WatchlistMovieItemProps> = ({
  data,
  onDelete,
}) => {
  return (
    <Paper variant="outlined" className="flex">
      <Box
        width="68px"
        height="100px"
        bgcolor="#2D2D2D"
        sx={{
          backgroundImage: `url(${data?.posterUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 12px"
      >
        <Typography>{`${data.title} (${data.releaseDate})`}</Typography>
        <IconButton color="secondary" onClick={onDelete}>
          <DeleteOutline />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default WatchlistMovieItem;
