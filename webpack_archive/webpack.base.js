const path = require('path');
const { BannerPlugin, IgnorePlugin } = require('webpack');

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, './src/css.js'),
      path.resolve(__dirname, './src/index.jsx'),
      path.resolve(__dirname, './src/svg.js'),
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'http://localhost:8080/',
    filename: 'build.js',
    chunkFilename: 'build-[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.(gif|png|jpg|jpeg|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[hash].[ext]',
        },
      }],
    }, {
      test: /\.(eot|woff2|woff|ttf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[hash].[ext]',
        },
      }],
    }, {
      test: /\.(wav|mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'sounds/[hash].[ext]',
        },
      }],
    }],
  },
  plugins: [
    new BannerPlugin({
      banner: dedent`
        Package: ${packageJson.name}
        Abstract: ${packageJson.description}
        Build Date: ${new Date().toString()}
        Copyright (C) ${new Date().getFullYear()} Flow Commerce Inc. All Rights Reserved.`,
    }),
    new IgnorePlugin(/node-fetch/),
  ],
};
