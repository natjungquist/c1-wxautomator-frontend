// Author: Natalie Jungquist
//
// This component provides a user interface for uploading a file to export users to the customer's contact center.
// It checks the user's authentication status via the `useAuth` hook and conditionally renders content
//   based on whether the user is authenticated. For authenticated users, it displays a file upload option
//   for CSV files. The user can select a CSV file, and the file name will be displayed once selected.
//
// Features:
//  - Displays content if authenticated.
//  - Prompts users to log in if not authenticated.
//  - Shows a file upload icon and accepts CSV files.
//  - Provides feedback for the selected file (CSV).

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useAuth } from '../Auth/AuthProvider'
import FileUpload from '../FileUpload'
import { inWrongAPIError_CC, webexAuthProviderName } from '../../utils/constants'

function Workspaces () {
  const { isAuthenticated, authProvider } = useAuth()
  const [csvFile, setCsvFile] = useState(null)

  // Function to handle CSV file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
    } else {
      alert('Please upload a valid CSV file')
    }
  }

  // Function to render content for authenticated users
  const renderAuthenticatedContent = () => (
    <>
      <Typography variant='h6'>Workspaces content</Typography>

      {/* File upload section */}
      <FileUpload handleFileChange={handleFileChange} />

      {/* {Displays the file name once uploaded} */}
      <Box>
        {csvFile && (
          <Typography variant='body2' color='textSecondary' mt={1}>
            File uploaded: {csvFile.name}
          </Typography>
        )}
      </Box>

      <Button
        variant='contained'
        color='primary'
        disableElevation
        disableRipple
      >
        Export Workspaces
      </Button>
    </>
  )

  // Function to render content for unauthenticated users
  const renderUnauthenticatedContent = () => (
    <Typography color='error'>{inWrongAPIError_CC}</Typography>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 4
      }}
    >

      {/* {If the user is logged in with the Webex Calling API, show this content.
          Otherise, show an error message.} */}
      {isAuthenticated && authProvider === webexAuthProviderName ? renderAuthenticatedContent() : renderUnauthenticatedContent()}

    </Box>
  )
}

export default Workspaces
