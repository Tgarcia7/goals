const stage = process.env.NODE_ENV === 'production' ? 'production' : 'staging'
const config = {
  apiUrl: `https://goals-api-${stage}.herokuapp.com`,
  baseToken: process.env.VUE_APP_API_TOKEN
}

export default config