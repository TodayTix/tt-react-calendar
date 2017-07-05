const { join, resolve } = require('path');
const root = resolve(__dirname, '..');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');

const isProduction = process.env.NODE_ENV === 'production';
const localIdentName = !isProduction
    ? '[name]--[local]'
    : '[hash:base64:5]';

module.exports = {
  devtool: 'eval',
  entry: {
    app: [
      'babel-polyfill',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      join(root, 'demo/src/index.jsx'),
    ],
  },
  output: {
    path: join(root, 'demo/static'),
    filename: 'bundle.js',
    publicPath: '/static',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        postcss: [
          cssnext,
        ],
        context: root,
        output: {
          path: join(root, 'demo/static'),
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          join(root, 'demo/src'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.pcss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              modules: true,
              importLoaders: 1,
              localIdentName,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              sourceComments: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [join(root, 'dist')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    quiet: true,
    publicPath: '/static/',
    port: 3000,
    contentBase: './demo',
    hot: true,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  },
}
