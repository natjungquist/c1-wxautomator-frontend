// Author: Natalie Jungquist
//
// This component renders the footer of the application, including:
// - The application name
// - A section with links to various resources like documentation and company information
// - A copyright notice
// - A link to the repository

import * as React from 'react'
import { Box, Typography, Link, Divider, Grid } from '@mui/material'
import { appName } from '../utils/constants'

function Footer () {
  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', py: 3, px: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Typography variant='h6'>
            {appName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7} container spacing={3}>
          <Grid item xs={4}>
            <Typography variant='subtitle1' gutterBottom>
              Resources
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>Webex Calling Docs</Link>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>Webex Developer Docs</Link>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>WxAutomator Docs</Link>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>Cisco Collab SharePoint</Link>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle1' gutterBottom>
              Webex
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>Control Hub</Link>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle1' gutterBottom>
              Company
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <Link href='#' color='inherit' underline='none'>ConvergeOne</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid container justifyContent='space-between'>
        <Grid item>
          <Typography variant='body2' color='text.secondary'>
            © {new Date().getFullYear()} ConvergeOne
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body2' color='text.secondary'>
            <Link href='#' color='inherit' underline='none'>Repository</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
