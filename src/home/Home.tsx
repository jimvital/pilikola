import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

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
      <Box display="flex" alignItems="center" gap="16px" margin="24px 0">
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
      <MovieList />
    </Box>
  );
};

export default Home;
