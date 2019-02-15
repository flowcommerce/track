const path = require('path');
const postcssCustomMedia = require('postcss-custom-media');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".jsx", ".js"]
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
        ]
      },
    ]
  }
};
