var pkg = require('./package.json');
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var postcssImport = require('postcss-import');
var postcssCustomMedia = require('postcss-custom-media');
var postcssNested = require('postcss-nested');
var postcssCSSNext = require('postcss-cssnext');
var postcssNano = require('cssnano');
var SvgStore = require('webpack-svgstore-plugin');

module.exports = {
  // faster rebuild times https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval',
  entry: [
    // Enables websocket connection
    'webpack-dev-server/client?http://localhost:8080',
    // Instruments entry to perform HMR in the browser
    // Doesn’t reload the browser upon syntax errors. This is recommended for React apps because
    // it keeps the state.
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, './src/css.js'),
    path.resolve(__dirname, './src/index.jsx'),
    path.resolve(__dirname, './src/svg.js'),
  ],
  resolve: {
    fallback: path.resolve(__dirname, 'node_modules'),
    extensions: ['', '.js', '.jsx'],
  },
  resolveLoader: {
    fallback: path.resolve(__dirname, 'node_modules'),
  },
  output: {
    path: `${__dirname}`,
    publicPath: 'http://localhost:8080/',
    filename: 'build.js',
    chunkFilename: 'build-[chunkhash].js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'react-hot-loader!babel-loader',
      include: [
        path.resolve(__dirname, './src'),
      ],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(css)$/,
      loader: 'style-loader!css-loader?sourceMap&-minimize!postcss-loader',
      include: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './css'),
        path.resolve(__dirname, './node_modules/highlight.js/styles'),
      ],
    }, {
      test: /\.(gif|png|jpg|jpeg|svg)$/,
      loader: 'file-loader?name=img/[hash].[ext]',
      exclude: [nodeModulesPath],
    }, {
      test: /\.(eot|woff2|woff|ttf|otf)$/,
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
    ];
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.IgnorePlugin(/node-fetch/),
    // Enables Hot Modules Replacement. Generates hot update chunks.
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),

    new SvgStore({
      // svgo options
      svgoOptions: {
        plugins: [
          { removeTitle: true }
        ]
      }
    }),
  ],
  devServer: {
    // Enables HMR in webpack-dev-server and libraries running in the browser
    hot: true,
    contentBase: './',
  }
};
