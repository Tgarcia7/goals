module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/goals/' : '/',
  pwa: {
    name: 'Goals',
    themeColor: '#343a40',
    msTileColor: '#343a40',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '0.0.3',
    workboxOptions: {
      skipWaiting: true
    }
  }
}
