import { Stack, Typography, TextField, Card  } from "@mui/material";
import React,{} from "react";
import MultipleSelectPlaceholder from "./components/MultipleSelectPlaceholder";
import UploadAttachment from "./components/UploadAttachment";



const createticket = () => {




  return (
    <Stack>
      <Card sx={{ height: 700, mt: 12 }}>
        <Typography variant="h4" p={2}>
          Create Ticket
        </Typography>

        {/* Stack for Name and Surname */}
        <Stack direction="row" spacing={2} sx={{ ml: 2, mt: 1 }}>
          <TextField
            label="First Name"
            variant="outlined"
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "blue",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "blue",
              },
            }}
          />
          <TextField
            label="Surname"
            variant="outlined"
            sx={{
              width: "48%",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "blue",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "blue",
              },
            }}
          />
        </Stack>

        {/* Email TextField */}
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          sx={{
            ml: 2,
            mt: 2,
            width: "98%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
            },
          }}
        />

        <MultipleSelectPlaceholder />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          sx={{
            ml: 2,
            mt: 2,
            width: "98%",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "blue",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "blue",
            },
          }}
        />
        <UploadAttachment/>
      </Card>
    </Stack>
  );
};

export default createticket;
