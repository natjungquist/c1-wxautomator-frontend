import { Alert } from '@mui/material'

function SummaryBar ({ totalCreateAttempts, numSuccessfullyCreated }) {
  return (
    <Alert severity='info'>
      {numSuccessfullyCreated}/{totalCreateAttempts} users successfully created.
    </Alert>
  )
}

export default SummaryBar
