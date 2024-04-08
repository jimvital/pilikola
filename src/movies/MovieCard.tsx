import React from "react";
import { isEmpty } from "lodash";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import {
  BookmarkAddOutlined,
  CheckBoxOutlineBlank,
  VisibilityOff,
} from "@mui/icons-material";

import { IMultiSelect, IWatched } from "@/pages/movies/types";

interface MovieCardProps {
  addToWatchlist?: (movie: object) => void;
  multiSelect?: IMultiSelect;
  watched?: IWatched;
}

const MovieCard: React.FC<MovieCardProps> = ({
  addToWatchlist,
  multiSelect,
  watched,
}) => {
  const isAddToWatchlist = addToWatchlist !== undefined;
  const isMultiSelect = !isEmpty(multiSelect);
  const isForWatched = !isEmpty(watched);

  const renderAction = () => {
    if (isAddToWatchlist) {
      return (
        <IconButton
          color="primary"
          className="absolute right-0"
          onClick={() => addToWatchlist({})}
        >
          <BookmarkAddOutlined />
        </IconButton>
      );
    }

    if (isMultiSelect) {
      const { setSelectedItems } = multiSelect;

      return (
        <IconButton
          color="secondary"
          className="absolute right-0"
          onClick={() => setSelectedItems([])}
        >
          <CheckBoxOutlineBlank />
        </IconButton>
      );
    }

    if (isForWatched) {
      const { setWatchedMovies } = watched;

      return (
        <IconButton
          color="secondary"
          className="absolute right-0"
          onClick={() => setWatchedMovies([])}
        >
          <VisibilityOff />
        </IconButton>
      );
    }

    return null;
  };

  return (
    <Card className="w-[165px]">
      <Box height="240px" bgcolor="#2D2D2D" className="relative">
        {renderAction()}
      </Box>
      <CardContent>
        <Link variant="h5" href="/movies/a1">
          Title
        </Link>
        <Typography variant="body2" color="text.secondary">
          (Year)
        </Typography>
        <Rating value={null} readOnly />
      </CardContent>
    </Card>
  );
};

export default MovieCard;