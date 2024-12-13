import { Stack, Typography, TextField, Card } from "@mui/material";
import React, { useState } from "react";
import MultipleSelectPlaceholder from "./components/MultipleSelectPlaceholder";
import UploadAttachment from "./components/UploadAttachment";

const CreateTicket = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  const handleSelectionChange = (value: string | null) => {
    setSelectedOption(value);
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

  return (
    <Stack>
      <Card sx={{ height: 700, mt: 12 }}>
        <Typography variant="h4" p={2}>
          Create Ticket
        </Typography>

        <Stack direction="row" spacing={2} sx={{ ml: 2, mt: 1 }}>
          <TextField
            label="First Name"
            variant="outlined"
            sx={{ width: "50%", ...textFieldStyles }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            sx={{ width: "48%", ...textFieldStyles }}
          />
        </Stack>

        {/* Email TextField */}
        <TextField
          label="Email"
          variant="outlined"
          sx={{ ml: 2, mt: 2, width: "98%", ...textFieldStyles }}
        />

        <MultipleSelectPlaceholder onChange={handleSelectionChange} />

        {selectedOption && (
          <>
            <TextField
              label="Description"
              multiline
              rows={4}
              sx={{ ml: 2, mt: 2, width: "98%", ...textFieldStyles }}
            />
            <UploadAttachment />
          </>
        )}
      </Card>
    </Stack>
  );
};

export default CreateTicket;
