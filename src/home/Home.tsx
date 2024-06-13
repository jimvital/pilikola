import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { PageLoader } from "@/common";
import { MovieList } from "@/movies";

const Home: React.FC = () => {
  const [, addToWatchlist] = useState<object>({});

  const fetchTrendingMovies = async () => {
    const response = await fetch("/api/movies/trending", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  };

  const { data: trendingMovies, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrendingMovies,
  });

  return (
    <Box height="100vh" padding="24px" display="flex" flexDirection="column">
      <Card variant="outlined" className="bg-[#2D2D2D] mb-[16px]">
        <CardContent>
          <Typography variant="h4">Welcome to Pilikola</Typography>
          <Typography>Browse movies and add them to watchlists</Typography>
        </CardContent>
      </Card>
      {isLoading ? <PageLoader /> : null}
      <MovieList
        movies={trendingMovies}
        containerClassName="flex flex-col max-h-[calc(100%-124px)]"
        className="flex-wrap overflow-y-auto"
        hasSearch
        showTrending
        addToWatchlist={addToWatchlist}
      />
    </Box>
  );
};

export default Home;
