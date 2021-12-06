const process = require('process');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chatController = require('./server/controllers/chatController');
const cookieParser = require('cookie-parser');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'dev.html'}),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    proxy: {'/api': 'http://localhost:3000'},
//    onBeforeSetupMiddleware: (devServer) => {
//      devServer.app.use(cookieParser());
//      devServer.app.get('/', chatController.setIfNotExistSessionCookie);
//    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

