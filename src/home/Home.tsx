import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { MovieList } from "@/movies";

const Home: React.FC = () => {
  return (
    <Box height="100vh" padding="24px" display="flex" flexDirection="column">
      <Card variant="outlined" className="bg-[#2D2D2D]">
        <CardContent>
          <Typography variant="h4">Welcome to Pilikola</Typography>
          <Typography>Browse movies and add them to watchlists</Typography>
        </CardContent>
      </Card>
      <MovieList className="flex-1 overflow-y-auto" hasSearch />
    </Box>
  );
};

export default Home;
