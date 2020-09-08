const config = {
  'auth': {
    'google': {
      'clientId': process.env.VUE_APP_GOOGLE_ID,
      'clientSecret': process.env.VUE_APP_GOOGLE_SECRET
    },
    'facebook': {
      'clientId': process.env.VUE_APP_FACEBOOK_ID,
      'clientSecret': process.env.VUE_APP_FACEBOOK_SECRET
    },
    'github': {
      'clientId': process.env.VUE_APP_GH_ID,
      'clientSecret': process.env.VUE_APP_GH_SECRET
    }
  }
}

export default config