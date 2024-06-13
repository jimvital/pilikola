import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface MovieCastProps {
  movieCast: MovieCast[];
}

const MovieCast: React.FC<MovieCastProps> = ({ movieCast }) => {
  return (
    <Box>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Top Cast
      </Typography>
      <Box display="flex" gap="24px">
        {movieCast.map((cast) => (
          <Box
            key={cast.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="8px"
            gap="4px"
            maxWidth="128px"
          >
            <Avatar className="h-16 w-16" alt={cast.name} src={cast.imageUrl} />
            <Typography textAlign="center">{cast.name}</Typography>
            <Typography variant="caption" textAlign="center">
              {cast.role}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MovieCast;
