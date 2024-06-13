import React from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { BookmarkAdd } from "@mui/icons-material";

dayjs.extend(duration);

interface MovieSummaryProps {
  movieDetails: MovieDetails;
}

const MovieSummary: React.FC<MovieSummaryProps> = ({ movieDetails }) => {
  const getRuntime = () => {
    const totalRuntime = dayjs.duration(movieDetails.runtime, "minutes");

    const hrsWithLabel = Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "hour",
      unitDisplay: "long",
    }).format(totalRuntime.get("hours"));
    const minsWithLabel = Intl.NumberFormat("en-US", {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
    }).format(totalRuntime.get("minutes"));

    return `${hrsWithLabel} ${minsWithLabel}`;
  };

  const getRating = () => {
    if (!movieDetails?.rating) return "N/A";

    return `${movieDetails.rating.toFixed(1)} / 5`;
  };

  return (
    <Grid container spacing={1}>
      <Grid item minWidth="248px">
        <Box
          height="360px"
          bgcolor="#2D2D2D"
          sx={{
            position: "relative",
            backgroundImage: `url(${movieDetails?.posterUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Grid>
      <Grid item flex={1} bgcolor="#191919">
        <Stack padding="24px">
          <Box display="flex" gap="4px" alignItems="center">
            <Typography variant="h4">{movieDetails.title}</Typography>
            <Typography variant="h5">{`(${
              movieDetails.releaseDate || "N/A"
            })`}</Typography>
          </Box>
          <Box display="flex" gap="12px" alignItems="center">
            <Typography variant="subtitle1">
              {movieDetails.genres?.join(", ")}
            </Typography>
            <Typography variant="subtitle1">•</Typography>
            <Typography variant="subtitle1">{getRuntime()}</Typography>
          </Box>
          <br />
          <Typography variant="body1" fontWeight="bold">
            Summary
          </Typography>
          <Typography variant="body2">{movieDetails.summary}</Typography>
          <br />
          <Box display="flex" gap="24px" alignItems="center">
            <Card variant="outlined" className="border-2 border-green-700">
              <CardContent>
                <Typography variant="body1" textAlign="center">
                  Rating
                </Typography>
                <Typography variant="body1" textAlign="center">
                  {getRating()}
                </Typography>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<BookmarkAdd />}
            >
              Add to Watchlist
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MovieSummary;
