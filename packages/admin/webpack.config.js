/**
 * Vendor
 */

const path = require('path');

/**
 * Plugins
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const { CheckerPlugin } = require('awesome-typescript-loader');

/**
 * ENV
 */

/**
 * Expo
 */

module.exports = {
  // devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index.tsx'),
    path.resolve(__dirname, 'src/legacy.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),

    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      // Typescript
      {
        test: /\.tsx?$/,
        use: ['thread-loader', 'babel-loader'],
      },

      // Styles user
      {
        test: /\.s?css$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[folder]__[local]-[hash:5]',
            },
          },
          'sass-loader',
        ],
      },

      // Styles lib
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },

      // Images
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './',
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false,
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2,
                }),
              ],
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:5].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist', 'zip']),
    new Dotenv({
      path: './.env.dev',
    }),

    new webpack.ProvidePlugin({
      cn: 'classnames',
      R: 'ramda',
      React: 'react',
      ReactDOM: 'react-dom',
      Redux: 'redux',
      ReactRedux: 'react-redux',
      ReactRouter: 'react-router',
      ReactRouterDom: 'react-router-dom',
      ConnectedReactRouter: 'connected-react-router',
      Phaser: 'phaser',
      EventEmitter: 'eventemitter3',
      reduce: ['lodash', 'reduce'],
      map: ['lodash', 'map'],
      min: ['lodash', 'min'],
      each: ['lodash', 'each'],
      find: ['lodash', 'find'],
      filter: ['lodash', 'filter'],
      findKey: ['lodash', 'findKey'],
      indexOf: ['lodash', 'indexOf'],
      findIndex: ['lodash', 'findIndex'],
      delay: ['lodash', 'delay'],
      uniq: ['lodash', 'uniq'],
      size: ['lodash', 'size'],
      filter: ['lodash', 'filter'],
      tail: ['lodash', 'tail'],
      range: ['lodash', 'range'],
      debounce: ['lodash', 'debounce'],
      groupBy: ['lodash', 'groupBy'],
      forEach: ['lodash', 'forEach'],
      isFunction: ['lodash', 'isFunction'],
      endsWith: ['lodash', 'endsWith'],
      jQuery: 'jquery',
      Countdown: ['react-countdown-now', 'default'],
      Tooltip: ['rc-tooltip', 'default'],
      axios: ['axios', 'default'],
      thunk: ['redux-thunk', 'default'],
      devtools: 'redux-devtools-extension',

      // Our tools
      WheelPage: ['./pages/Wheel/index.tsx', 'default'],
      WheelThumb: ['./components/widgets/WheelThumb/index.tsx', 'default'],
      Container: ['./components/common/Container/index.tsx', 'default'],
      Col: ['./components/common/Col/index.tsx', 'default'],
      Row: ['./components/common/Row/index.tsx', 'default'],
      Icon: ['./components/common/Icon/index.tsx', 'default'],
      Button: ['./components/common/Button/index.tsx', 'default'],
      WheelSpinCounter: ['./components/WheelSpinCounter/index.tsx', 'default'],

      // Reducers
      userNew: ['./store/user/reducer', 'default'],
      products: ['./store/products/reducer', 'default'],
      wheel: ['./store/wheel/reducer', 'default'],
      game: ['./store/game/reducer', 'default'],

      // Actions
      fetchUser: ['./store/user/actions', 'fetchUser'],
      updateUser: ['./store/user/actions', 'updateUser'],
      receiveUser: ['./store/user/actions', 'receiveUser'],
      receiveSession: ['./store/game/actions', 'receiveSession'],
      receiveFetchProduct: ['./store/products/actions', 'receiveFetchProduct'],
      withdrawalProduct: ['./store/products/actions', 'withdrawalProduct'],
    }),

    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      mobile: true,
      title: 'Instant Games',
      inject: false,
      headHtmlSnippet: `<script src='/fbMock.js'></script>`,
      appMountId: 'root',
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      },
    }),

    new CheckerPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'stage'),
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    stats: 'minimal',
    watchContentBase: true,
    watchOptions: {
      poll: true,
      aggregateTimeout: 3000,
    },
    hot: false,
  },
};
