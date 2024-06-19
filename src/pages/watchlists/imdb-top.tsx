import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { PageLoader } from "@/common";
import { MovieList } from "@/movies";

const ImdbTopPage: React.FC = () => {
  const {
    query: { watchlistId },
  } = useRouter();

  const fetchImdbTop = async () => {
    const response = await fetch("/api/movies/imdb-top", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  };

  const { data: watchlistDetails, isFetching } = useQuery<Watchlist>({
    queryKey: ["watchlists", watchlistId],
    queryFn: fetchImdbTop,
  });

  const getAverageRating = () => {
    if (!watchlistDetails?.averageRating) return "N/A";

    return `${watchlistDetails.averageRating.toFixed(1)} / 5`;
  };

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      {isFetching ? <PageLoader /> : null}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          {watchlistDetails?.name}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="bold">
        Description
      </Typography>
      <Typography variant="body2">{watchlistDetails?.description}</Typography>
      <br />
      <Box display="flex" gap="24px">
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Total Movie Count
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {watchlistDetails?.movies?.length ?? "N/A"}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Average Rating
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              {getAverageRating()}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <br />
      <MovieList
        movies={watchlistDetails?.movies}
        className="flex-wrap overflow-y-auto"
        isAddToWatchlist
      />
    </Box>
  );
};

export default ImdbTopPage;
