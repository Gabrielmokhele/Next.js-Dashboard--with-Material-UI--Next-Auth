import {
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import MultipleSelectPlaceholder from "./components/MultipleSelectPlaceholder";
import UploadAttachment from "./components/UploadAttachment";
import MultipleSelectDepartment from "./components/MultipleSelectDepartment";

// Define type for each question with multiple options
interface CheckboxQuestion {
  question: string;
  options: string[];
}

const CreateTicket = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [checkboxAnswers, setCheckboxAnswers] = useState<Record<string, boolean[]>>({});
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]); // Array to hold multiple files

  // Validation states
  const [errors, setErrors] = useState({
    firstName: false,
    surname: false,
    email: false,
    department: false,
    issue: false,
    description: false,
  });

  // Handle file change from UploadAttachment
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files); // Convert FileList to array
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Add new files to the existing ones
    }
  };

  const handleSelectionChange = (value: string | null) => {
    setSelectedOption(value);
  };

  const handleDepartmentChange = (value: string | null) => {
    setSelectedDepartment(value);
  };

  const handleCheckboxChange = (question: string, option: string) => {
    setCheckboxAnswers((prevState) => {
      const newState = { ...prevState };

      // Initialize the question's answers array if it doesn't exist
      if (!newState[question]) {
        newState[question] = [];
      }

      // Check if the option is already selected
      const optionIndex = newState[question].indexOf(option);

      if (optionIndex > -1) {
        // If option is already selected, remove it
        newState[question] = newState[question].filter(
          (item) => item !== option
        );
      } else {
        // If option is not selected, add it
        newState[question].push(option);
      }

      return newState;
    });
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#04dead",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#04dead",
    },
  };

  // Define checkbox questions for each option
  const questions: Record<string, CheckboxQuestion[]> = {
    "Software(Node,1Stream, etc)": [
      {
        question: "What kind of software issue are you facing?",
        options: ["Installation", "Configuration", "Performance", "Bug/Crash"],
      },
      {
        question: "Which platform are you using?",
        options: ["Windows", "macOS", "Linux"],
      },
      {
        question: "Is the issue related to a specific feature?",
        options: ["Yes", "No"],
      },
      {
        question: "Have you tried restarting the application?",
        options: ["Yes", "No"],
      },
      { question: "Are you using the latest version?", options: ["Yes", "No"] },
    ],
    "Hardware(Printer, Monitor, etc)": [
      {
        question: "What kind of hardware issue are you facing?",
        options: ["Not Turning On", "Connectivity", "Performance", "Other"],
      },
      {
        question: "Which hardware are you using?",
        options: ["Printer", "Monitor", "Keyboard", "Mouse"],
      },
      { question: "Is there any physical damage?", options: ["Yes", "No"] },
      { question: "Have you checked the power cable?", options: ["Yes", "No"] },
      { question: "Have you updated the drivers?", options: ["Yes", "No"] },
    ],
    // other options...
  };

  const handleSubmit = () => {
    const newErrors = {
      firstName: !firstName,
      surname: !surname,
      email: !email,
      department: !selectedDepartment,
      issue: !selectedOption,
      description: !description,
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).includes(true);
    if (hasErrors) return; // Don't submit if there are errors

    const formData = {
      Firstname: firstName,
      Surname: surname,
      Email: email,
      Department: selectedDepartment,
      Problem: selectedOption,
      Answers: checkboxAnswers,
      Description: description,
      Files: files, // Submit multiple files here
    };

    // Log the form data to the console
    console.log("Form Data Submitted:", formData);
    console.log("Checkbox Answers:", checkboxAnswers);
    console.log("Files Attachment:", files); // Log the array of files
  };

  return (
    <Stack mt={10}>
      <Typography variant="h4" p={2}>
        Create Ticket
      </Typography>

      <Stack direction="row" spacing={2} sx={{ ml: 2, mt: 1 }}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={handleInputChange(setFirstName)}
          sx={{ width: "50%", ...textFieldStyles }}
          error={errors.firstName}
          helperText={errors.firstName ? "First Name is required" : ""}
        />
        <TextField
          label="Surname"
          variant="outlined"
          value={surname}
          onChange={handleInputChange(setSurname)}
          sx={{ width: "48%", ...textFieldStyles }}
          error={errors.surname}
          helperText={errors.surname ? "Surname is required" : ""}
        />
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleInputChange(setEmail)}
        sx={{ ml: 2, mt: 2, width: "98%", ...textFieldStyles }}
        error={errors.email}
        helperText={errors.email ? "Email is required" : ""}
      />

      {/* Department Selection */}
      <MultipleSelectDepartment onChange={handleDepartmentChange} />
      {errors.department && <FormHelperText error>Department is required</FormHelperText>}

      {/* Issue Selection */}
      <MultipleSelectPlaceholder onChange={handleSelectionChange} />
      {errors.issue && <FormHelperText error>Issue selection is required</FormHelperText>}

      {selectedOption && (
        <>
          {questions[selectedOption]?.map((q, index) => (
            <Stack key={index} sx={{ ml: 2, mt: 2, width: "98%" }}>
              <Typography variant="h6">{q.question}</Typography>
              {q.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  control={
                    <Checkbox
                      checked={checkboxAnswers[q.question]?.includes(option) || false}
                      onChange={() => handleCheckboxChange(q.question, option)}
                      sx={{ ml: 2 }}
                    />
                  }
                  label={option}
                />
              ))}
            </Stack>
          ))}

          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={handleInputChange(setDescription)}
            sx={{ ml: 2, mt: 2, width: "98%", ...textFieldStyles }}
            error={errors.description}
            helperText={errors.description ? "Description is required" : ""}
          />

          {/* Upload Multiple Attachments */}
          <UploadAttachment handleFileChange={handleFileChange} files={files} />

          <Stack height={200}>
            <Button sx={{ mt: 3, width: "98%", ml: 2 }} onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CreateTicket;
