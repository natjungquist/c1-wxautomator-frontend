// Author: Natalie Jungquist
//
// This component provides authentication context for the application.
// It manages the authentication state (`isAuthenticated`),
// handles user login/logout, and checks the user's authentication status on initial load.
// The authentication status is passed down via context to other components.
//
// The AuthProvider component:
// - Checks if the user is authenticated when it mounts
// - Provides login and logout functionality
// - Tracks loading state to prevent rendering before authentication status is determined

import React, { createContext, useContext, useState, useEffect } from 'react'
import { backendUrl, webexAuthProviderName, webexContactCenterAuthProviderName } from '../../utils/constants'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [authProvider, setAuthProvider] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // Need to include this so that isAuthenticated is properly passed to other components

  useEffect(() => {
    checkAuthStatus() // Need to check if user is logged in when app loads
  }, [])

  const checkAuthStatus = async () => {
    // Calls the backend to check if the user is logged in
    // Sets 'isAuthenticated' variable accordingly
    // Sets 'authProvider' variable accordingly
    try {
      const response = await fetch(`${backendUrl}/check-auth`, {
        method: 'GET',
        credentials: 'include',
        redirect: 'manual'
      })

      if (response.status === 0) {
        window.location.href = `${backendUrl}/login`
      }

      const data = await response.json()
      const isLoggedIn = data.isAuthenticated
      if (isLoggedIn === 'true') {
        setisAuthenticated(true)

        if (data.authProvider === webexAuthProviderName) {
          setAuthProvider(webexAuthProviderName)
        } else if (data.authProvider === webexContactCenterAuthProviderName) {
          setAuthProvider(webexContactCenterAuthProviderName)
        }
      } else {
        setisAuthenticated(false)
      }
    } catch (error) {
      console.error('Error fetching checking authentication status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    // Redirect to the backend for login
    window.location.href = `${backendUrl}`
  }

  const handleLogout = async () => {
    // Calls the backend to logout
    // Clears the session storage to wipe all memory of user who was previously logged in
    try {
      await fetch(`${backendUrl}/logout`, {
        credentials: 'include',
        method: 'POST',
        redirect: 'follow'
      })
      sessionStorage.clear()
      setisAuthenticated(false)
      setAuthProvider(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    // The AuthContext.Provider wraps the children components and provides authentication-related values
    // such as the user's authentication status, loading state, and login/logout functions.
    <AuthContext.Provider value={{ isAuthenticated, authProvider, isLoading, handleLogin, handleLogout, setisAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
