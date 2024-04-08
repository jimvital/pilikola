import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { IMultiSelect } from "@/pages/movies/types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  className?: string;
  title?: string;
  hasSearch?: boolean;
  multiSelect?: IMultiSelect;
}

const MovieList: React.FC<MovieListProps> = ({
  className,
  title,
  hasSearch = false,
  multiSelect,
}) => {
  return (
    <Box>
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
        <MovieCard multiSelect={multiSelect} />
      </Box>
    </Box>
  );
};

export default MovieList;
