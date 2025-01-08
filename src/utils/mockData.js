export const mockExportUsersResponse = {
  status: 200,
  totalCreateAttempts: 2,
  numSuccessfullyCreated: 1,
  message: '',
  results: [
    {
      status: 201,
      message: 'Created.',
      email: 'user9@c1-ps.com',
      firstName: 'user',
      lastName: 'nine',
      licenseResults: [
        {
          licenseName: 'Contact Center Premium Agent',
          status: 200,
          message: 'Assigned.'
        },
        {
          licenseName: 'Webex Calling - Professional',
          status: 200,
          message: 'Assigned.'
        }
      ]
    },
    {
      status: 409,
      message: 'User already exists.',
      email: 'user9@c1-ps.com',
      firstName: 'user',
      lastName: 'nine again',
      licenseResults: [
        
      ]
    }
  ],
  readyToSend: true
}
