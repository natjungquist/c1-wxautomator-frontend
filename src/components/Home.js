// Author: Natalie Jungquist
//
// This component displays the home page, showing the user's organization name and display name.
// It checks sessionStorage for any previously stored user and organization data, and if not found, makes API requests to fetch the required information.
// The `getMyOrganizationDetails` and `getMyDetails` functions handle the API calls for fetching the organization name and user display name.

import React, { useState, useEffect } from 'react'
import { backendUrl, webexAuthProviderName } from '../utils/constants'
import { Box, Typography, Tabs } from '@mui/material'
import Users from './WebexCalling/Users'
import Devices from './WebexCalling/Devices'
import Workspaces from './WebexCalling/Workspaces'
import { useAuth } from './Auth/AuthProvider'
import HomeTab from './HomeTab'

function Home () {
  const [orgName, setOrgName] = useState('') // To display the user's customer name
  const [userDisplayName, setUserDisplayName] = useState('') // To display the user's name
  const [tabValue, setTabValue] = useState(0) // To manage the selected tab. By default, the first tab (index 0) is set.
  const { authProvider } = useAuth()

  useEffect(() => {
    // If the user is logged in with the Webex API, check sessionStorage when component mounts for user displayName and orgName.

    // Getting the orgName is only possible with the Webex API;
    // It is NOT a possible API call with the Webex Contact Center API.
    if (authProvider === webexAuthProviderName) {
      const storedOrgName = sessionStorage.getItem('orgName')
      if (storedOrgName) {
        setOrgName(storedOrgName) // If orgName is already in session storage, use it
      } else {
        getMyOrganizationDetails() // Otherwise, call the API to fetch the orgName
      }
    }

    // Getting the userDisplayName is possible with both APIs.
    const storedUserDisplayName = sessionStorage.getItem('userDisplayName')
    if (storedUserDisplayName) {
      setUserDisplayName(storedUserDisplayName)
    } else {
      getMyDetails()
    }
  }, [authProvider])

  const getMyOrganizationDetails = async () => {
    // Calls backend for organization details
    // Sets orgName accordingly
    try {
      const response = await fetch(`${backendUrl}/my-organization`, {
        credentials: 'include', // Ensures cookies are sent
        method: 'GET',
        redirect: 'manual'
      })

      if (response.status === 0) {
        window.location.href = `${backendUrl}/login`
      }

      const data = await response.json()
      setOrgName(data.displayName)

    } catch (error) {
      console.error('Error fetching /my-organization:', error)
    }
  }

  const getMyDetails = async () => {
    // Calls backend for user's name
    // Sets userDisplayName accordingly
    try {
      const response = await fetch(`${backendUrl}/my-name`, {
        credentials: 'include', // Ensures cookies are sent
        method: 'GET',
        redirect: 'manual'
      })

      if (response.status === 0) {
        window.location.href = `${backendUrl}/login`
      }

      const data = await response.json()
      setUserDisplayName(data.displayName)
    } catch (error) {
      console.error('Error fetching /my-name:', error)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  function GreetingSection() {
    // Render a message to the user to confirm they are logged in.
    return (
      <Box>
        <Typography variant='h3' component='h2' gutterBottom>
          Hello, {userDisplayName}!
        </Typography>
      </Box>
    )
  }

  function CustomerNameSection() {
    // Render a message to the user to confirm their customer organization name.
    return (
      <Box mb={3}>
        <Typography variant='h5' component='h2' gutterBottom>
          Customer: {orgName}
        </Typography>
      </Box>
    )
  }

  function TabsSection() {
    // Render the tabs for the user to choose what they want to do with Webex.
    return (
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label='tabs'
          textColor='primary'
          indicatorColor='primary'
          TabIndicatorProps={{ style: { bottom: '5px' } }}
        >
          <HomeTab label='Export Users' value={0} />
          <HomeTab label='Export Workspaces' value={1} />
          <HomeTab label='Export Devices' value={2} />
          {/* <HomeTab label='Pilot Generator' value={3} /> */}
        </Tabs>

        {/* Conditionally render tab content */}
        <Box hidden={tabValue !== 0}>
          <Users />
        </Box>
        <Box hidden={tabValue !== 1}>
          <Devices />
        </Box>
        <Box hidden={tabValue !== 2}>
          <Workspaces />
        </Box>
        {/* <Box hidden={tabValue !== 3}>
          to be implemented later
        </Box> */}
      </Box>
    )
  }

  return (
    <Box mt={5} mb={5}>
      {GreetingSection()}
      {CustomerNameSection()}
      {TabsSection()}
    </Box>
  )
}

export default Home
