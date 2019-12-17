module.exports = {
  devServer: {
    proxy: {
      '/api/codewars': {
        changeOrigin: true,
        pathRewrite: {
          '^/api/codewars': ''
        },
        target: 'https://www.codewars.com/api/v1'
      }
    }
  }
}
