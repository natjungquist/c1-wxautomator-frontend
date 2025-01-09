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
//  - Displays a loading screen while waiting for the backend response.
//  - Provides feedback for the selected file (CSV).

import React, { useState } from 'react'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { useAuth } from '../Auth/AuthProvider'
import FileUpload from '../FileUpload'
import UserResultList from './UserResultList'
import SummaryBar from './SummaryBar'
import { inWrongAPIError_CC, webexAuthProviderName, backendUrl } from '../../utils/constants'

function Users () {
  const { isAuthenticated, authProvider } = useAuth()
  const [csvFile, setCsvFile] = useState(null)
  const [exportResponse, setExportResponse] = useState(null)
  const [loading, setLoading] = useState(false) // Add a loading state

  const handleFileChange = (event) => {
    // Function to handle CSV file upload
    const file = event.target.files[0]
    if (file && file.type === 'text/csv') {
      setCsvFile(file)
    } else {
      alert('Please upload a valid CSV file')
    }
  }

  const handleFileUpload = async () => {
    // Function to send the inputted csv file to the backend for processing.
    // That is, to export the users in the csv file to Webex.
    if (!csvFile) {
      alert('No file selected')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('file', csvFile)

    try {
      const response = await fetch(`${backendUrl}/export-users`, {
        credentials: 'include',
        method: 'POST',
        redirect: 'manual',
        body: formData
      })

      if (response.status === 403) {
        // TODO show unauthorized info; handle this in the backend
      }

      if (response.status === 0) {
        window.location.href = `${backendUrl}/login`
      }

      const data = await response.json()
      setExportResponse(data)
    } catch (error) {
      console.error('Error exporting users:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderAuthenticatedContent = () => (
    // Function to render 'export users' content for authenticated users
    <Box>
      <Box>
        <Typography variant='h6'>Upload a CSV file</Typography>

        {/* File upload section */}
        <FileUpload handleFileChange={handleFileChange} />

        {/* {Displays the file name once uploaded} */}
        {csvFile && (
          <Typography variant='body2' color='textSecondary' mt={1}>
            File uploaded: {csvFile.name}
          </Typography>
        )}

        <Button
          variant='contained'
          color='primary'
          disableElevation
          disableRipple
          onClick={handleFileUpload}
          disabled={loading} // Disable the button while loading
        >
          Export Users
        </Button>
      </Box>

      <Box mt={4}> 
        {loading ? ( 
          <CircularProgress /> // Show a loading indicator 
        ) : ( 
          exportResponse && (
          <> 
            <SummaryBar totalCreateAttempts={exportResponse.totalCreateAttempts} numSuccessfullyCreated={exportResponse.numSuccessfullyCreated} /> 
            <UserResultList results={exportResponse.results} /> 
          </> 
          )
        )} 
      </Box>
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
