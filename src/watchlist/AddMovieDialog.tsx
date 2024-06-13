import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { MovieList } from "@/movies";
import { Close } from "@mui/icons-material";

interface AddMovieModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ open, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<unknown[]>([]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add movies to current watchlist</DialogTitle>
      <IconButton onClick={onClose} className="!absolute top-[8px] right-[8px]">
        <Close />
      </IconButton>
      <DialogContent className="px-[24px] pt-0 pb-[10px]">
        <MovieList
          hasSearch
          containerClassName="flex flex-col max-h-[400px]"
          className="flex-wrap overflow-y-auto"
          multiSelect={{ selectedItems, setSelectedItems }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          disabled={selectedItems.length === 0}
        >
          Add ({`${selectedItems.length} movie/s selected`})
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMovieModal;
