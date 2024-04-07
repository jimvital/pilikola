import React, { useState } from "react";
import { Button, Modal, Paper } from "@mui/material";
import { MovieList } from "@/movies";

interface AddMovieModalProps {
  open: boolean;
  onClose: () => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ open, onClose }) => {
  const [selectedItems, setSelectedItems] = useState<unknown[]>([]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={2}
        className={`
            absolute 
            top-[50%] left-[50%] 
            translate-x-[-50%] translate-y-[-50%] 
            w-3/4 p-[24px]
        `}
      >
        <MovieList
          hasSearch
          title="Add movies to current watchlist"
          multiSelect={{ selectedItems, setSelectedItems }}
          className="mb-[24px]"
        />
        <Button
          variant="contained"
          fullWidth
          disabled={selectedItems.length === 0}
        >
          Add ({`${selectedItems.length} movie/s selected`})
        </Button>
      </Paper>
    </Modal>
  );
};

export default AddMovieModal;
