const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = {
  apiUrl: `https://goals-api-${stage}.herokuapp.com`,
  baseToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjoiNWYxNDEwYzE2ZTFjOGQwNWM2YzY3NzA3IiwibmFtZSI6IlVzdWFyaW8gcHJ1ZWJhcyIsImVtYWlsIjoidGdhcmNpYW1pcmFuZGFAZ21haWwuY29tIiwiYWRtaW4iOjF9LCJpYXQiOjE1OTUxNTA1MjksImV4cCI6MjA2ODQ0OTcyOX0.YVVClqsvVCbTdtJsoZ8_eAx4Spf35XNH48xO0d_6c0I'
}

export default config