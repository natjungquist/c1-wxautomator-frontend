// Author: Natalie Jungquist
//
// This component provides a file upload input specifically for CSV files. It uses Material UI's Input and IconButton components to create a custom file upload button with a cloud upload icon.
//
// Props:
// - handleFileChange (function): A callback function that handles the file selection event and processes the uploaded file.
//
// Functionality:
// - The file input is hidden using the 'sx' prop for styling, and a custom label with an icon button is used to trigger the file input.
// - Only CSV files are allowed for upload, as specified by the 'accept' attribute in the file input.
//
// Usage:
// - This component can be reused across the application wherever a file upload functionality is needed, specifically for CSV file uploads.

import React from 'react'
import { Input, IconButton, Box } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

function FileUpload ({ handleFileChange }) {
  return (
    <Box mt={2} textAlign='center'>
      <Input
        type='file'
        inputProps={{ accept: '.csv' }}
        onChange={handleFileChange}
        sx={{ display: 'none' }} // Hide the default file input that says 'Choose file'
        id='csv-file-input'
      />
      <label htmlFor='csv-file-input'>
        <IconButton
          component='span'
          color='primary'
          sx={{ fontSize: 40 }}
        >
          <CloudUploadIcon />
        </IconButton>
      </label>
    </Box>
  )
}

export default FileUpload
