var pkg = require('./package.json');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var postcssImport = require('postcss-import');
var postcssCustomMedia = require('postcss-custom-media');
var postcssNested = require('postcss-nested');
var postcssCSSNext = require('postcss-cssnext');
var postcssNano = require('cssnano');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var extract = ExtractTextPlugin.extract;

function dedent(strings, ...values) {
  function format(string) {
    let size = -1;
    return string.replace(/\n(\s+)/g, (m, m1) => {
      if (size < 0) {
        size = m1.replace(/\t/g, '    ').length;
      }

      return '\n' + m1.slice(Math.min(m1.length, size));
    });
  }

  let output = strings
    .slice(0, values.length + 1)
    .map((text, i) => (i === 0 ? '' : values[i - 1]) + text)
    .join('');

  return format(output);
}

module.exports = {
  devtool: 'source-map',
  bail: true,
  entry: [
    path.resolve(__dirname, './src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/build.js',
    chunkFilename: 'js/build-[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      presets: ['flowio'],
      exclude: [nodeModulesPath],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(css)$/,
      loader: extract('style-loader', 'css-loader?sourceMap&-minimize!postcss-loader'),
      include: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules/highlight.js/styles'),
      ],
    }, {
      test: /\.(gif|png|jpg|jpeg|svg)$/,
      loader: 'file-loader?name=img/[hash].[ext]',
      exclude: [nodeModulesPath],
    }, {
      test: /\.(eot|woff2|woff|ttf)$/,
      loader: 'file-loader?name=fonts/[hash].[ext]',
      exclude: [nodeModulesPath],
    }, {
      test: /\.(wav|mp3)$/,
      loader: 'file-loader?name=sounds/[hash].[ext]',
      exclude: [nodeModulesPath],
    }],
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      postcssCustomMedia,
      postcssNested,
      postcssCSSNext,
      postcssNano({ zindex: false }),
    ];
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.BannerPlugin(dedent`
      Package: ${pkg.name}
      Abstract: ${pkg.description}
      Version: ${pkg.version}
      Build Date: ${new Date().toString()}
      Copyright (C) ${new Date().getFullYear()} Flow Commerce Inc. All Rights Reserved.`),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'VERSION': JSON.stringify(pkg.version),
      },
    }),
    new webpack.IgnorePlugin(/node-fetch/),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('css/build.css', {
      allChunks: true,
    }),
  ],
};
