const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN // String that store the location of hosted application

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/' // to redirect public path for cloud
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing:`marketing@${domain}/marketing/latest/remoteEntry.js`, // Fill in the hosted domain name
        marketing:`auth@${domain}/auth/latest/remoteEntry.js`, // Fill in the hosted domain name
      },
      shared: packageJson.dependencies,
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)