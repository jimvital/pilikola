import React from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { BookmarkAddOutlined } from "@mui/icons-material";

const MovieCard: React.FC = () => {
  return (
    <Card className="w-[165px]">
      <Box height="240px" bgcolor="#2D2D2D" className="relative">
        <IconButton color="secondary" className="absolute right-0">
          <BookmarkAddOutlined />
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="h5">Title</Typography>
        <Typography variant="body2" color="text.secondary">
          (Year)
        </Typography>
        <Rating value={null} readOnly />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
