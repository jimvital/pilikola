import React, { useState } from "react";
import Link from "next/link";
import { isEmpty } from "lodash";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import {
  Bookmarks,
  CheckBox,
  CheckBoxOutlineBlank,
  Visibility,
  VisibilityOffOutlined,
} from "@mui/icons-material";

import { IMultiSelect, IWatched } from "@/pages/movies/types";
import AddToWatchlistModal from "./AddToWatchlistModal";

interface MovieCardProps {
  data?: Movie;
  isAddToWatchlist?: boolean;
  multiSelect?: IMultiSelect;
  watched?: IWatched;
}

const MovieCard: React.FC<MovieCardProps> = ({
  data = {} as Movie,
  isAddToWatchlist,
  multiSelect,
  watched,
}) => {
  const isMultiSelect = !isEmpty(multiSelect);
  const isForWatched = !isEmpty(watched);

  const [isAddToWatchlistOpen, setIsAddToWatchlistOpen] =
    useState<boolean>(false);

  const renderAction = () => {
    if (isAddToWatchlist) {
      return (
        <IconButton
          color="primary"
          className="!absolute top-1 right-1 !bg-black/80"
          onClick={() => {
            setIsAddToWatchlistOpen(true);
          }}
        >
          <Bookmarks />
        </IconButton>
      );
    }

    if (isMultiSelect) {
      const { selectedItems, setSelectedItems } = multiSelect;

      const isSelected = !!selectedItems.find(({ id }) => data?.id === id);

      return (
        <IconButton
          color="secondary"
          className="!absolute top-1 left-1 !bg-black/80"
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
      const { watchedMovies, handleWatched } = watched;

      const isWatched = watchedMovies.includes(data.id);

      return (
        <IconButton
          color="secondary"
          className="!absolute top-1 right-1 !bg-black/80"
          onClick={() => handleWatched(data)}
        >
          {isWatched ? <Visibility /> : <VisibilityOffOutlined />}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <>
      {isAddToWatchlistOpen ? (
        <AddToWatchlistModal
          movie={data || ({} as Movie)}
          open={isAddToWatchlistOpen}
          onClose={() => setIsAddToWatchlistOpen(false)}
        />
      ) : null}
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
          <Link
            className="font-medium text-[#90caf9] hover:underline"
            href={`/movies/${data?.id}`}
          >
            {data?.title}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {`(${data?.releaseDate || "N/A"})`}
          </Typography>
          <Rating value={data?.rating} precision={0.25} readOnly />
        </CardContent>
      </Card>
    </>
  );
};

export default MovieCard;
