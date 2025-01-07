import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const [subject, setSubject] = useState(""); // To store the subject input

  const buttonStyles = {
    background: "linear-gradient(258deg, #003fe9 0%, #26e6aa 100%)",
    color: "#fff",
    border: "none",
    "&:hover": {
      background: "linear-gradient(71deg, #003fe9 0%, #26e6aa 100%)",
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubject("");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const createSubject = useMutation({
    mutationFn: (data: { subject: string }) => {
      console.log("Submitting data:", data);
      return axios.post("http://localhost:5000/subject", data);
    },
    onSuccess: () => {
      setSnackbar({
        open: true,
        message: "Subject created successfully!",
        severity: "success",
      });
      setSubject("");
      setOpen(false);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create subject.",
        severity: "error",
      });
    },
  });

  const handleSubmit = () => {
    if (subject) {
      createSubject.mutate({ subject }); // Pass the subjectName
    } else {
      setSnackbar({
        open: true,
        message: "Subject name cannot be empty.",
        severity: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyles}>
        Add Subject
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add Subject"}</DialogTitle>
        <DialogContent>
          <Stack mb={2} direction="row" alignItems="center">
            <DialogContentText>
              Please enter the subject you would like to add.
            </DialogContentText>
            <Tooltip
              placement="top"
              title="Please ensure that you enter the correct subject name and the spelling is correct."
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <TextField
            variant="outlined"
            sx={{ width: 500 }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)} // Update the subject name state
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
