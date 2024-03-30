import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const MovieCast: React.FC = () => {
  return (
    <Box>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Top Cast
      </Typography>
      <Box display="flex" gap="24px">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="8px"
          gap="4px"
          maxWidth="128px"
        >
          <Avatar className="h-16 w-16">#</Avatar>
          <Typography textAlign="center">Name</Typography>
          <Typography variant="caption" textAlign="center">
            Role
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieCast;
