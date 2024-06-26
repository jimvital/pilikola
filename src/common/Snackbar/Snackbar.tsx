import React, { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";

import { SnackbarContext } from "./SnackbarContext";

const CustomSnackbar: React.FC = () => {
  const { snackbar, handleCloseSnackbar } = useContext(SnackbarContext);

  const { open, type, message } = snackbar;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
