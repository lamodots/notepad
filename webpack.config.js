const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: 'public',
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  resolve: {
    
    extensions: ['.ts', '.js'],
  },
};