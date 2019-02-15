const path = require('path');
const compose = require('lodash/fp/compose');
const merge = require('lodash/fp/merge');

const baseConfig = require('./webpack.base');
const partials = require('./webpack.partials');

const siteDomain = 'localhost:8000'; // originally from a config
const httpProtocol = siteDomain.includes('localhost') ? 'http' : 'https';

module.exports = compose([
  merge({
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
      namedModules: true,
      noEmitOnErrors: true,
    },
  }),
  partials.hot({
    path: `${httpProtocol}://${siteDomain}/__webpack_hmr`,
    reload: true,
  }),
  partials.output({
    pathinfo: true,
  }),
  partials.loader(

  ),
  partials.loader({
    test: /\.jsx?$/,
    use: 'happypack/loader?id=javascript',
    include: [
      path.resolve(__dirname, './client'),
      path.resolve(__dirname, './common'),
      path.resolve(__dirname, './generated'),
    ],
  }),
  partials.loader({
    test: /\.(css)$/,
    use: 'happypack/loader?id=stylesheet',
    include: [
      path.resolve(__dirname, './client'),
      path.resolve(__dirname, './common'),
    ],
  }),
  partials.plugin(new HardSourceWebpackPlugin()),
  partials.plugin(new HappyPack({
    id: 'javascript',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'babel-loader',
    }],
  })),
  partials.plugin(new HappyPack({
    id: 'stylesheet',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    }],
  })),
  partials.plugin(new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      FLOW_API_URI: JSON.stringify('https://api.flow.io'),
      FLOW_BEACON_URI: JSON.stringify('https://beacon.flow.io'),
      FLOW_JWT_ISSUER: JSON.stringify('https://console.flow.io'),
      GOOGLE_PLACES_API_KEY: JSON.stringify(process.env.GOOGLE_PLACES_API_KEY),
    },
  })),
])(baseConfig);
