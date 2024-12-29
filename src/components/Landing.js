// Author: Natalie Jungquist
//
// This component renders the landing page with a centered login button.
// It uses the `useAuth` hook to access the `handleLogin` function and allows users to log in with Webex.
// The login button triggers the authentication process and redirects the user as needed.

import React from 'react'
import { Button, Box } from '@mui/material'
import { useAuth } from './Auth/AuthProvider'

function Landing () {
  const { handleLogin } = useAuth()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
      }}
    >
      <Button
        variant='contained'
        color='primary'
        disableRipple
        disableElevation
        onClick={handleLogin}
      >
        Login with Webex
      </Button>
    </Box>
  )
}

export default Landing
