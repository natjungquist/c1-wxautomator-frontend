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
//  - TODO
//  - Provides feedback for the selected file (CSV).

import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useAuth } from '../Auth/AuthProvider'
import FileUpload from '../FileUpload'
import { inWrongAPIError_CC, webexAuthProviderName, backendUrl } from '../../utils/constants'

function Users () {
  const { isAuthenticated, authProvider } = useAuth()
  const [csvFile, setCsvFile] = useState(null)

  const handleFileChange = (event) => {
    // Function to handle CSV file upload
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
    } else {
      alert('Please upload a valid CSV file')
    }
  }

  // TODO
  // function validateCsvFormat() {
  //   // Checks the csv file to make sure it has the correct column headers.
  // }

  const handleFileUpload = async () => {
    // Function to send the inputted csv file to the backend for processing.
    // That is, to export the users in the csv file to Webex.
    if (!csvFile) {
      alert('No file selected')
      return
    }

    const formData = new FormData()
    formData.append('file', csvFile)

    try {
      const response = await fetch(`${backendUrl}/export-users`, {
        credentials: 'include',
        method: 'POST',
        redirect: 'manual',
        body: formData
      })

      if (response.status === 0) {
        window.location.href = `${backendUrl}/login`
      }

      if (response.ok) {

      } else if (response.status === 404) {
        // TODO internal server is down message
      } else {

      }

    } catch (error) {
      console.error('Error exporting users:', error)
    }
  }

  const renderAuthenticatedContent = () => (
    // Function to render 'export users' content for authenticated users
    <Box>
      <Typography variant='h6'>Users content</Typography>

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
        onClick={handleFileUpload}
      >
        Export Users
      </Button>
    </Box>
  )

  const renderUnauthenticatedContent = () => (
    // Function to render an error message for unauthenticated users
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

export default Users
