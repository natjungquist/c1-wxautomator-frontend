// Author: Natalie Jungquist
//
// This component is a customized version of Material UI's Tab prop.
// It is used on the Home page.

import React from 'react'
import { Tab } from '@mui/material'

function HomeTab (props) {
  return (
    <Tab
      disableRipple
      sx={{ textTransform: 'none', ...props.sx }}
      {...props}
    />
  )
}

export default HomeTab
