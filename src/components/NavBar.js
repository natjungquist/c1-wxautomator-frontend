// Author: Natalie Jungquist
//
// This component renders the navigation bar of the application, which includes:
// - The application name, which links to the home page
// - A user avatar icon that opens a menu with options to log in or log out, depending on authentication status
// It uses Material-UI components like AppBar, Toolbar, IconButton, Avatar, and Menu for layout and functionality.
// The `useAuth` hook is used to manage authentication and login/logout actions.

import * as React from 'react'
import { appName } from '../utils/constants'
import { AppBar, Box, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton } from '@mui/material'
import { useState } from 'react'
import { useAuth } from './Auth/AuthProvider'
import { Link } from 'react-router-dom'

export default function NavBar () {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' elevation={0}>
        <Toolbar>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {appName}
          </Typography>
          <div>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <Avatar alt='User Avatar' />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {isAuthenticated
                ? (
                  <MenuItem onClick={() => { handleLogout(); handleClose() }}>Logout</MenuItem>
                  )
                : (
                  <MenuItem onClick={() => { handleLogin(); handleClose() }}>Login</MenuItem>
                  )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
