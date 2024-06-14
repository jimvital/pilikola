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
  CheckBox,
  CheckBoxOutlineBlank,
  VisibilityOff,
} from "@mui/icons-material";

import { IMultiSelect, IWatched } from "@/pages/movies/types";

interface MovieCardProps {
  data?: Movie;
  addToWatchlist?: (movie: object) => void;
  multiSelect?: IMultiSelect;
  watched?: IWatched;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data,
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
      const { selectedItems, setSelectedItems } = multiSelect;

      const isSelected = !!selectedItems.find(({ id }) => data?.id === id);

      return (
        <IconButton
          color="secondary"
          className="absolute right-0"
          onClick={() => {
            setSelectedItems((prev) => {
              if (isSelected) {
                return prev.filter(({ id }) => id !== data?.id);
              }

              return [...prev, data];
            });
          }}
        >
          {isSelected ? <CheckBox /> : <CheckBoxOutlineBlank />}
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
      <Box
        height="240px"
        bgcolor="#2D2D2D"
        sx={{
          position: "relative",
          backgroundImage: `url(${data?.posterUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {renderAction()}
      </Box>
      <CardContent>
        <Link variant="h6" href={`/movies/${data?.id}`}>
          {data?.title}
        </Link>
        <Typography variant="body2" color="text.secondary">
          {`(${data?.releaseDate || "N/A"})`}
        </Typography>
        <Rating value={data?.rating} precision={0.25} readOnly />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
