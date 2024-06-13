import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MovieOutlined, Search, Whatshot } from "@mui/icons-material";

import { PageLoader } from "@/common";
import { IMultiSelect, IWatched } from "@/pages/movies/types";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies?: Movie[];
  containerClassName?: string;
  className?: string;
  title?: string;
  hasSearch?: boolean;
  showTrending?: boolean;
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
  showTrending = false,
  addToWatchlist,
  multiSelect,
  watched,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [didSearch, setDidSearch] = useState<boolean>(false);

  const fetchSearchedMovies = async () => {
    const response = await fetch(`/api/movies/search?value=${searchValue}`, {
      method: "GET",
    });
    const data = await response.json();

    if (!didSearch) {
      setDidSearch(true);
    }

    return data;
  };

  const {
    data: searchedMovies,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["search"],
    queryFn: fetchSearchedMovies,
    enabled: false,
    initialData: [],
  });

  const movieResults: Movie[] = didSearch ? searchedMovies : movies;

  const showTrendingDivider = showTrending && !didSearch;
  const showResultsPlaceholder = movieResults.length === 0;

  return (
    <Box className={containerClassName}>
      {title ? (
        <Typography variant="body1" fontWeight="bold" marginBottom="16px">
          {title}
        </Typography>
      ) : null}
      {hasSearch ? (
        <Box display="flex" alignItems="center" gap="16px" marginBottom="16px">
          {isFetching ? <PageLoader /> : null}
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
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearchValue("");
              setDidSearch(false);
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => refetch()}
          >
            Search
          </Button>
        </Box>
      ) : null}
      {showTrendingDivider ? (
        <Divider className="!mb-[16px]">
          <Chip
            icon={<Whatshot />}
            label="Trending this week"
            size="medium"
            color="warning"
          />
        </Divider>
      ) : null}
      {showResultsPlaceholder ? (
        <Stack
          spacing={1}
          className="h-[320px] justify-center items-center opacity-25"
        >
          <MovieOutlined fontSize="large" />
          <Typography variant="h6">Nothing to see here...</Typography>
        </Stack>
      ) : null}
      <Box display="flex" gap="24px" className={className}>
        {movieResults.map((movie) => (
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
