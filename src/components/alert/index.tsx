import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { AlertProps } from "./interfaces";

export const Alert = ({ open, onClose, message, type }: AlertProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
