import { List, ListItem, ListItemText, ListItemIcon, Typography, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function UserResultList ({ results }) {
  return (
    <List>
      {results.map((result, index) => (
        <ListItem key={index} sx={{ color: result.status === 201 ? 'green' : 'red' }}>
          <ListItemIcon>
            {result.status === 201 ? <CheckCircleIcon /> : <CancelIcon />}
          </ListItemIcon>
          <ListItemText
            primary={`${result.firstName} ${result.lastName} (${result.email})`}
            secondary={result.message}
          />

          <Box ml={15}>
            <Typography variant='body2'>
              Licenses
              {result.licenseResults.map((license, i) => (
                <div key={i}>
                  <span>{i+1}. {license.licenseName} - </span>
                  <span> {license.message}</span>
                </div>
              ))}
            </Typography>
          </Box>
          
        </ListItem>
      ))}
    </List>
  )
}

export default UserResultList
