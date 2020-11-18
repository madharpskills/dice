const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  entry: {
    index: './src/main.js'
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}