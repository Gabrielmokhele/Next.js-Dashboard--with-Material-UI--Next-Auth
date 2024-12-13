import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

const UploadAttachment: React.FC = () => {
  // State to hold the selected file
  const [file, setFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]); // Get the first file selected
    }
  };

  // Handle the file upload (can be extended to upload the file to a server)
  const handleUpload = () => {
    if (file) {
      alert(`File selected: ${file.name}`);
    } else {
      alert('No file selected.');
    }
  };

  return (
    <Stack spacing={2} sx={{   ml: 2,
        mt: 2, }}>
      <Typography variant="h6">Upload Attachment</Typography>
      
      {/* File input button */}
      <Button
        variant="outlined"
        component="label"
        sx={{ width: '200px' }}
      >
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>
      
      {/* Display file name if selected */}
      {file && <Typography variant="body2">Selected File: {file.name}</Typography>}
      
      {/* Upload button */}
    </Stack>
  );
};

export default UploadAttachment;
