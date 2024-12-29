// Author: Natalie Jungquist
//
// This component is responsible for protecting routes that require authentication.
// It checks if the user is authenticated using the `useAuth` hook from the `AuthProvider` context.
// - If the authentication status is still loading, it displays a loading spinner (`CircularProgress`)
// - If the user is authenticated, it renders the child components
// - If the user is not authenticated, it redirects them to the landing page (`/`)
//
// The `RequireAuth` component ensures that only authenticated users can access certain parts of the app.
// It used to wrap routes that require the user to be logged in.

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { Box, CircularProgress } from '@mui/material'

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <CircularProgress />
      </Box>
    )
  }

  // Sends the user to the Landing page if not authenticated
  return isAuthenticated ? children : <Navigate to='/' replace />
}

export default RequireAuth
