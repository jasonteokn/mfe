const { merge } = require('webpack-merge') // Function to merge 2 different webpack config object
const HtmlWebpackPlugin = require('html-webpack-plugin') // Take some HTML files and inject some script tag in
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', //not strictly required
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      },
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
} 

module.exports = merge(commonConfig, devConfig) // 2nd option will override 1st option
