const path = require('path')

module.exports = {
  entry: './src/withRenderDelay.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'functional-js.jsx',
    library: 'functional-js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
      }
    ]
  }
}