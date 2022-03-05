const HtmlWebpackPlugin = require('html-webpack-plugin') // Take some HTML files and inject some script tag in

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, //process files with ending mjs or js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
}