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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Define interfaces for the data structure
interface Option {
  id: string;
  question_id: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

interface Question {
  id: string;
  subject_id: string;
  question: string;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

interface Subject {
  id: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

interface CheckboxQuestion {
  question: string;
  options: string[];
}

const CreateTicket = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [checkboxAnswers, setCheckboxAnswers] = useState<Record<string, string[]>>({});
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // Validation states
  const [errors, setErrors] = useState({
    firstName: false,
    surname: false,
    email: false,
    department: false,
    issue: false,
    description: false,
  });

  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['subject'],
    queryFn: () => axios.get("http://localhost:5000/QuestionsandAnswers"),
  });

  // Transform the backend data into the required format
  const transformData = (subjects: Subject[] | undefined): Record<string, CheckboxQuestion[]> => {
    if (!subjects) return {};
    
    return subjects.reduce((acc, subject) => {
      acc[subject?.subject] = subject?.questions?.map(question => ({
        question: question?.question,
        options: question?.options?.map(option => option?.answer)
      }));
      return acc;
    }, {} as Record<string, CheckboxQuestion[]>);
  };

  const questions = transformData(queryData?.data?.data);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
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
      if (!newState[question]) {
        newState[question] = [];
      }
      const optionIndex = newState[question].indexOf(option);
      if (optionIndex > -1) {
        newState[question] = newState[question].filter(
          (item) => item !== option
        );
      } else {
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

    if (Object.values(newErrors).includes(true)) return;

    const formData = {
      Firstname: firstName,
      Surname: surname,
      Email: email,
      Department: selectedDepartment,
      Problem: selectedOption,
      Answers: checkboxAnswers,
      Description: description,
      Files: files,
    };

    console.log("Form Data Submitted:", formData);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data: {error.toString()}</Typography>;

  return (
    <Stack mt={10} ml={10}>
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

      <MultipleSelectDepartment onChange={handleDepartmentChange} />
      {errors.department && <FormHelperText error>Department is required</FormHelperText>}

      <MultipleSelectPlaceholder onChange={handleSelectionChange} />
      {errors.issue && <FormHelperText error>Issue selection is required</FormHelperText>}

      {selectedOption && questions[selectedOption] && (
        <>
          {questions[selectedOption].map((q, index) => (
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