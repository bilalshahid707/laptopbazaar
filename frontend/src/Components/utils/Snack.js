import React from "react";
import { Snackbar, Alert } from "@mui/material";
export const Snack = ({ open, severity, message,onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
