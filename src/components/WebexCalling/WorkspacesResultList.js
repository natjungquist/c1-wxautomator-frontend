// Author: Natalie Jungquist
//
// This component displays a list of workspace results based on their status. 
// Each user result shows: 
// - Green checkmark if the status is 201 (successful) or red cross if not
// 
// Features:
// - Displays workspace result list with status icons 

import { List, ListItem, ListItemText, ListItemIcon, Typography, Grid, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function WorkspaceResultList ({ results }) {
  if (!results || results.length === 0) { 
    return <Typography variant="body2">No results to display</Typography> 
  }

  return (
    <List >
      {results.map((result, index) => (
        <ListItem key={index} sx={{ color: result.status === 201 ? 'green' : 'red' }}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={12} sm={1}>
              <ListItemIcon sx={{ color: result.status === 201 ? 'green' : 'red'}}>
                {result.status === 201 ? <CheckCircleIcon /> : <CancelIcon />}
              </ListItemIcon>
            </Grid>
            <Grid item xs={12} sm={5}>
            <ListItemText
              primary={`${result.name}`}
              secondary={result.status !== 201 ? result.message : null}
            />
            </Grid>
            
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

export default WorkspaceResultList