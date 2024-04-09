import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { MovieList } from "@/movies";

const WatchlistDetailsPage: React.FC = () => {
  const router = useRouter();

  const [watchedMovies, setWatchedMovies] = useState<unknown[]>([]);

  return (
    <Box
      maxHeight="100vh"
      padding="24px"
      display="flex"
      flexDirection="column"
      className="overflow-y-auto"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Watchlist name
        </Typography>
        <Box display="flex" gap="12px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/watchlists/edit/w1")}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      </Box>
      <Typography variant="body1" fontWeight="bold">
        Description
      </Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <br />
      <Box display="flex" gap="24px">
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Movie Count
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              N/A
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Unwatched Runtime
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              N/A
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" className="border-2">
          <CardContent>
            <Typography variant="body1" textAlign="center">
              Average Rating
            </Typography>
            <Typography variant="body1" textAlign="center" color="primary">
              N/A
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <br />
      <MovieList watched={{ watchedMovies, setWatchedMovies }} />
    </Box>
  );
};

export default WatchlistDetailsPage;
