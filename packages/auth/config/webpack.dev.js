const { merge } = require('webpack-merge') // Function to merge 2 different webpack config object
const HtmlWebpackPlugin = require('html-webpack-plugin') // Take some HTML files and inject some script tag in
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap'
      },
      shared: packageJson.dependencies,
      // shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
} 

module.exports = merge(commonConfig, devConfig) // 2nd option will override 1st option
