const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', { loader: 'css-loader', options: { esModule: false } }] },
      { test: /\.png$/, use: [{ loader: 'url-loader', options: { outputPath: 'assets/img', esModule: false } }] },
      { test: /\.ico$/, use: 'file-loader' }
    ]
  },
  entry: './src/main.js',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}