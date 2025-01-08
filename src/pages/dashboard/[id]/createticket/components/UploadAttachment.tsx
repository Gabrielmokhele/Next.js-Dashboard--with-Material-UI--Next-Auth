import React from "react";
import { Button, Stack, Typography } from "@mui/material";

interface UploadAttachmentProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
}

const UploadAttachment: React.FC<UploadAttachmentProps> = ({ handleFileChange, files }) => {
  return (
    <Stack spacing={2} sx={{ ml: 2, mt: 2 }}>
      <Typography variant="h6">Upload Attachments</Typography>

      <Button variant="outlined" component="label" sx={{ width: "200px" }}>
        Choose Files
        <input
          type="file"
          multiple
          hidden
          onChange={handleFileChange} // Handle multiple file selection
        />
      </Button>

      {/* Display the list of selected files */}
      {files.length > 0 && (
        <Stack>
          <Typography variant="body1" sx={{fontWeight:'bold'}}>Selected Files:</Typography>
          {files.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name}
            </Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default UploadAttachment;
