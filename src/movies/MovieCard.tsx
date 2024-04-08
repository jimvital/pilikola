import React from "react";
import { isEmpty } from "lodash";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { BookmarkAddOutlined, CheckBoxOutlineBlank } from "@mui/icons-material";

import { IMultiSelect } from "@/pages/movies/types";

interface MovieCardProps {
  multiSelect?: IMultiSelect;
  disableAction?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  multiSelect,
  disableAction = false,
}) => {
  const isMultiSelect = !isEmpty(multiSelect);

  return (
    <Card className="w-[165px]">
      <Box height="240px" bgcolor="#2D2D2D" className="relative">
        {disableAction ? null : (
          <IconButton
            color={isMultiSelect ? "primary" : "secondary"}
            className="absolute right-0"
          >
            {isMultiSelect ? <CheckBoxOutlineBlank /> : <BookmarkAddOutlined />}
          </IconButton>
        )}
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
