import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BasicSelect from "./BasicSelect"; // Assuming BasicSelect is your select component
import { Stack, TextField } from "@mui/material";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function AlertDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    subject_id: ''
  });

  const buttonStyles = {
    background: "linear-gradient(258deg, #003fe9 0%, #26e6aa 100%)",
    color: "#fff",
    border: "none",
    "&:hover": {
      background:"linear-gradient(71deg, #003fe9 0%, #26e6aa 100%)",
    },
  };

  // Handle opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle closing the dialog and resetting form data
  const handleClose = () => {
    setOpen(false);
    setFormData({
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      subject_id: ''
    });
  };

  // Handle input changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle subject selection change
  const handleSubjectChange = (selectedSubjectId) => {
    setFormData((prevState) => ({
      ...prevState,
      subject_id: selectedSubjectId
    }));
  };

  // Mutation for submitting the form data to the backend
  const createQnA = useMutation({
    mutationFn: (data) => {
      console.log("Submitting data:", data);
      return axios.post("http://localhost:5000/QuestionsandAnswers", data);
    },
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  // Handle form submission
  const handleSubmit = async () => {
    // Check if subject_id is selected
    if (!formData.subject_id) {
      console.error("Subject is required");
      return;
    }

    createQnA.mutate(formData); // Submit the form data
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyles}>
        Add Questions
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Questions and Answers
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <BasicSelect onChange={handleSubjectChange} value={formData.subject_id} />
            <TextField
              variant="outlined"
              placeholder="Question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
            <TextField
              variant="outlined"
              placeholder="Answer1"
              name="answer1"
              value={formData.answer1}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
            <TextField
              variant="outlined"
              placeholder="Answer2"
              name="answer2"
              value={formData.answer2}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
            <TextField
              variant="outlined"
              placeholder="Answer3"
              name="answer3"
              value={formData.answer3}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
            <TextField
              variant="outlined"
              placeholder="Answer4"
              name="answer4"
              value={formData.answer4}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
            <TextField
              variant="outlined"
              placeholder="Answer5"
              name="answer5"
              value={formData.answer5}
              onChange={handleChange}
              sx={{ width: 550 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
