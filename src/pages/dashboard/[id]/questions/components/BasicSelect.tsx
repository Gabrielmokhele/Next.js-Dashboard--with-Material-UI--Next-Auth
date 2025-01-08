import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BasicSelectProps {
  onChange: (selectedSubjectId: string) => void; // Define the onChange prop to be passed from parent
  value: string; // The current selected value
}

export default function BasicSelect({ onChange, value }: BasicSelectProps) {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => axios.get("http://localhost:5000/subjects"),
  });

  // Add console logs to debug data structure
  console.log("Raw data:", data);
  console.log("Data structure:", {
    data: data?.data,
    success: data?.data?.success,
    message: data?.data?.message,
    subjects: data?.data?.data,
  });

  // Get subjects array, handling the nested data structure
  const subjects = data?.data?.data || [];

  const handleChange = (event) => {
    const selectedSubjectId = event.target.value;
    onChange(selectedSubjectId); // Call the parent handler to update the subject_id in the parent
    console.log("Selected value:", selectedSubjectId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subjects</div>;

  return (
    <Box sx={{ minWidth: 500 }}>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value} // Use the value prop passed from the parent
          label="Subject"
          onChange={handleChange} // Trigger the onChange function passed from the parent
        >
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.subject}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No subjects available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
