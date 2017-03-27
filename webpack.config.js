const path = require('path');
const compact = require('lodash/compact');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

const fs = require('fs');

const REPO_ROOT = __dirname;
const ASSETS_PATH = path.resolve(REPO_ROOT, 'dist');

const babelrc = JSON.parse(fs.readFileSync(path.resolve(
  __dirname,
  '.babelrc'
), 'utf8'));

module.exports = (env) => ({
  entry: './src/index.js',
  output: {
    path: ASSETS_PATH,
    filename: 'index.js',
    library: 'tt-react-calendar',
    libraryTarget: 'umd',
  },
  externals: {
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
        amd: 'lodash',
      root: '_',
    },
    'lodash/fp': {
      commonjs: 'lodash/fp',
      commonjs2: 'lodash/fp',
      amd: 'lodash/fp',
      root: 'fp',
    },
    'moment': {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
      root: 'moment',
    },
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
    ],
  },
  plugins: compact([
    new CleanPlugin([ASSETS_PATH], { root: REPO_ROOT }),
    (env === 'dist:min' ? new webpack.optimize.UglifyJsPlugin() : null),
  ]),
})
