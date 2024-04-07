import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const WatchlistMovieItem: React.FC = () => {
  return (
    <Paper variant="outlined" className="flex">
      <Box width="68px" height="100px" bgcolor="#2D2D2D" />
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 12px"
      >
        <Typography>Title (Year)</Typography>
        <IconButton color="secondary">
          <DeleteOutline />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default WatchlistMovieItem;
