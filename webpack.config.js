module.exports = {
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: `
            @import "@sweetalert2/theme-dark/dark.scss";
          `
        }
      }
    ]
  }