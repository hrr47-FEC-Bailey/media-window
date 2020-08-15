const path = require('path');


module.exports = {
  entry: path.join(__dirname, 'client/src/component/index.jsx'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'client'),
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/react', '@babel/env']
        }
      },
    ]
  }
};