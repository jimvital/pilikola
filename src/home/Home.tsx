import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { MovieList } from "@/movies";

const Home: React.FC = () => {
  const [, addToWatchlist] = useState<object>({});
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  const fetchData = async () => {
    const response = await fetch("/api/movies/trending", {
      method: "GET",
    });
    const data = await response.json();

    setTrendingMovies(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box height="100vh" padding="24px" display="flex" flexDirection="column">
      <Card variant="outlined" className="bg-[#2D2D2D] mb-[16px]">
        <CardContent>
          <Typography variant="h4">Welcome to Pilikola</Typography>
          <Typography>Browse movies and add them to watchlists</Typography>
        </CardContent>
      </Card>
      <MovieList
        movies={trendingMovies}
        containerClassName="flex flex-col max-h-[calc(100%-124px)]"
        className="flex-wrap overflow-y-auto"
        hasSearch
        addToWatchlist={addToWatchlist}
      />
    </Box>
  );
};

export default Home;
