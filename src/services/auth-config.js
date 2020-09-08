const config = {
  'auth': {
    'google': {
      'clientId': process.env.VUE_APP_API_GOOGLE_ID,
      'clientSecret': process.env.VUE_APP_API_GOOGLE_SECRET
    },
    'facebook': {
      'clientId': process.env.VUE_APP_API_FACEBOOK_ID,
      'clientSecret': process.env.VUE_APP_API_FACEBOOK_SECRET
    },
    'github': {
      'clientId': process.env.VUE_APP_API_GH_ID,
      'clientSecret': process.env.VUE_APP_API_GH_SECRET
    }
  }
}

export default config