const { HotModuleReplacementPlugin } = require('webpack');

exports.output = options => config => ({
  ...config,
  output: {
    ...config.output,
    ...options,
  },
});

exports.loader = loader => config => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      loader,
    ],
  },
});

exports.plugin = plugin => config => ({
  ...config,
  plugins: [
    ...config.plugins,
    plugin,
  ],
});

exports.inject = (entries, modules) => {
  if (typeof entries === 'string') {
    return [...modules, entries];
  }

  if (Array.isArray(entries)) {
    return [...modules, ...entries];
  }

  if (typeof entries === 'object') {
    return Object.keys(entries).reduce((previosValue, key) => ({
      ...previosValue,
      [key]: exports.inject(entries[key], modules),
    }), {});
  }

  throw new TypeError();
};

exports.hot = options => config => ({
  ...config,
  entry: exports.inject(config.entry, [
    `webpack-hot-middleware/client?path=${encodeURIComponent(options.path)}&reload=${encodeURIComponent(options.reload)}`,
    'react-hot-loader/patch',
  ]),
  plugins: [
    ...config.plugins,
    new HotModuleReplacementPlugin(),
  ],
});
