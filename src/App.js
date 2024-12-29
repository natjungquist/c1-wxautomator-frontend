// Author: Natalie Jungquist
//
// This file is the main entry point for the application, setting up routing, authentication, and theming.
//
// Key features include:
// - The use of `BrowserRouter` from `react-router-dom` to handle routing between pages.
// - The `AuthProvider` component wraps the entire application to provide authentication context.
// - The `RequireAuth` component is used to protect the `/home` route, ensuring that users must be authenticated to access it.
// - The `ThemeProvider` component is used to apply the Material-UI theme throughout the application.
// - Routes are defined for the Landing page (`/`) and the protected Home page (`/home`).

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import SharedLayout from './components/SharedLayout'
import Home from './components/Home'
import { ThemeProvider } from '@emotion/react'
import { AuthProvider } from './components/Auth/AuthProvider'
import RequireAuth from './components/Auth/RequireAuth'

import { createTheme } from '@mui/material'

function App () {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lato, sans-serif'
    },
    palette: {
      primary: {
        light: '#0D86AE',
        main: '#073E51',
        dark: '#003040',
        contrastText: '#fff'
      },
      secondary: {
        light: '#32B4DF',
        main: '#118AB2',
        dark: '#046B8E',
        contrastText: '#fff'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <SharedLayout>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route
                path='/home'
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
            </Routes>
          </SharedLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
