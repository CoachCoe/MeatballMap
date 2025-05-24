const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@rneui/base', '@rneui/themed']
    }
  }, argv);

  // Add CopyWebpackPlugin to copy map.html
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'web/map.html'),
          to: path.resolve(__dirname, 'web-build/map.html'),
        },
      ],
    })
  );

  // Remove any existing CSS rules
  config.module.rules = config.module.rules.filter(rule => {
    if (rule.test) {
      return !rule.test.toString().includes('.css');
    }
    return true;
  });

  // Add unified CSS rule that handles both regular CSS and Leaflet's CSS
  config.module.rules.push({
    test: /\.css$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: false // This is important for Leaflet CSS
        }
      }
    ]
  });

  // Handle all static assets including Leaflet's assets
  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'static/[name][ext]'
    }
  });

  // Add resolve aliases for Leaflet
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      'leaflet': 'leaflet/dist/leaflet.js'
    }
  };

  return config;
}; 