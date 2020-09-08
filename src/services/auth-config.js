const config = {
  'auth': {
    'google': {
      'clientId': process.env.API_GOOGLE_ID || process.env.VUE_APP_API_GOOGLE_ID,
      'clientSecret': process.env.API_GOOGLE_SECRET || process.env.VUE_APP_API_GOOGLE_SECRET
    },
    'facebook': {
      'clientId': process.env.API_FACEBOOK_ID || process.env.VUE_APP_API_FACEBOOK_ID,
      'clientSecret': process.env.API_FACEBOOK_SECRET || process.env.VUE_APP_API_FACEBOOK_SECRET
    },
    'github': {
      'clientId': process.env.API_GH_ID || process.env.VUE_APP_API_GH_ID,
      'clientSecret': process.env.API_GH_SECRET || process.env.VUE_APP_API_GH_SECRET
    }
  }
}

export default config