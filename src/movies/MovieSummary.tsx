import React from "react";
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

const MovieSummary: React.FC = () => {
  return (
    <Grid container spacing={1}>
      <Grid item minWidth="248px">
        <Box height="360px" bgcolor="#2D2D2D" />
      </Grid>
      <Grid item flex={1} bgcolor="#191919">
        <Stack padding="24px">
          <Box display="flex" gap="4px" alignItems="center">
            <Typography variant="h4">Title</Typography>
            <Typography variant="h5">(Year)</Typography>
          </Box>
          <Box display="flex" gap="12px" alignItems="center">
            <Typography variant="subtitle1">Genre</Typography>
            <Typography variant="subtitle1">•</Typography>
            <Typography variant="subtitle1">Runtime</Typography>
          </Box>
          <br />
          <Typography variant="body1" fontWeight="bold">
            Summary
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <br />
          <Box display="flex" gap="24px" alignItems="center">
            <Card variant="outlined" className="border-2 border-green-700">
              <CardContent>
                <Typography variant="body1" textAlign="center">
                  Rating
                </Typography>
                <Typography variant="body1" textAlign="center">
                  N/A
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
