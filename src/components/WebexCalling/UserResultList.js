import { List, ListItem, ListItemText, ListItemIcon, Typography, Grid, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function UserResultList ({ results }) {
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
              primary={`${result.firstName} ${result.lastName} (${result.email})`}
              secondary={result.status !== 201 ? result.message : null}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body1">
                {result.licenseResults.map((license, i) => ( 
                  <div
                    key={i}
                    style={{ color: license.status === 200 ? 'green' : 'red' }}
                  >
                    {i + 1}. {license.licenseName} - {license.status !== 200 ? license.message : 'Assigned.'} 
                  </div>
                  ))}
                </Typography>
              </Box>
  
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  )
}

export default UserResultList
