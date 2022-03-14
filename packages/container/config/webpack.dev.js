const { merge } = require('webpack-merge') // Function to merge 2 different webpack config object
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', //not strictly required
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
        auth: 'auth@http://localhost:8082/remoteEntry.js'
      },
      // shared: ['react', 'react-dom'],
      shared: packageJson.dependencies,
    })
  ]
} 

module.exports = merge(commonConfig, devConfig) // 2nd option will override 1st option
