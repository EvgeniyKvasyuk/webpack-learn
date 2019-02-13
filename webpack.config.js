const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     "style-loader", // creates style nodes from JS strings
      //     {
      //       loader: "css-loader",
      //       options: {
      //          // modules: true // use CSS modules
      //       }
      //     }, // translates CSS into CommonJS
      //     "sass-loader" // compiles Sass to CSS, using Node Sass by default
      //   ],
      //   exclude: /node_modules/
      // },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: '[path][name].[ext]',
            outputPath: 'img/'
          }
        },
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      title: 'Hello, everyone!'
    }),
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9001,
    historyApiFallback: true,
    host: '127.0.0.1',
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    noEmitOnErrors: true
  },
  mode: 'development',
  watch: true,
  devtool: 'source-map' //create source-map
};