const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, './src/css.js'),
    path.resolve(__dirname, './src/index.jsx'),
    path.resolve(__dirname, './src/svg.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/js'),
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'astroturf/loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'postcss-loader',
        ],
        include: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './css'),
        ],
      },
    ],
  },
};
