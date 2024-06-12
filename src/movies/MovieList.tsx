import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { IMultiSelect, IWatched } from "@/pages/movies/types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies?: Movie[];
  containerClassName?: string;
  className?: string;
  title?: string;
  hasSearch?: boolean;
  addToWatchlist?: (movie: object) => void;
  multiSelect?: IMultiSelect;
  watched?: IWatched;
}

const MovieList: React.FC<MovieListProps> = ({
  movies = [],
  containerClassName,
  className,
  title,
  hasSearch = false,
  addToWatchlist,
  multiSelect,
  watched,
}) => {
  return (
    <Box className={containerClassName}>
      {title ? (
        <Typography variant="body1" fontWeight="bold" marginBottom="16px">
          {title}
        </Typography>
      ) : null}
      {hasSearch ? (
        <Box display="flex" alignItems="center" gap="16px" marginBottom="16px">
          <TextField
            placeholder="Search movies by title"
            size="small"
            variant="standard"
            fullWidth
            InputProps={{
              type: "search",
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="secondary">
            Search
          </Button>
        </Box>
      ) : null}
      <Box display="flex" gap="24px" className={className}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            data={movie}
            addToWatchlist={addToWatchlist}
            multiSelect={multiSelect}
            watched={watched}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MovieList;
