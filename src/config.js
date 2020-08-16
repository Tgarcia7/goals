const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = {
  apiUrl: `https://goals-api-${stage}.herokuapp.com`,
  baseToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoiNWYzOTc3YjdiNWM2ZTRmZTkxZTU0NmI1IiwibmFtZSI6IlVzdWFyaW8gcHJ1ZWJhcyIsImVtYWlsIjoidGdhcmNpYW1pcmFuZGEyQGdtYWlsLmNvbSIsImFkbWluIjoxfSwiaWF0IjoxNTk3NjAxNzE5LCJleHAiOjMzMTIyODg4MTE5fQ.UeFymNsmC_rjxR_JTLIBrI57Z4AlUB0-XlDp84-XDac'
}

export default config