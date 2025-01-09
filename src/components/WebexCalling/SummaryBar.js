// Author: Natalie Jungquist
//
// This component displays a summary of the export results.
// Each user result shows: 
// - num successes / total attempts
// 
// Features: 
// - Displays results with info icon

import { Alert } from '@mui/material'

function SummaryBar ({ totalCreateAttempts, numSuccessfullyCreated }) {
  return (
    <Alert severity='info'>
      {numSuccessfullyCreated}/{totalCreateAttempts} users successfully created.
    </Alert>
  )
}

export default SummaryBar
