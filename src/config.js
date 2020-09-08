const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = {
  apiUrl: `https://goals-api-${stage}.herokuapp.com`,
  baseToken: process.env.API_TOKEN
}

export default config