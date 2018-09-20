const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
  resolve: {
    modules: ['dist', 'node_modules'],
    extensions: ['.ts', '.js', '.json'],
    alias: {
      'abstract-element': path.resolve(__dirname, '../lib/esm2015'),
      "abstract-element/render-hyper": path.resolve(__dirname, '../lib/esm2015/render-hyper'),
      "abstract-element/render-lit": path.resolve(__dirname, '../lib/esm2015/render-lit')
    }
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  entry: {
    'index': path.join(__dirname, 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [{
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false
            }
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.join(__dirname, 'tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      [{
        from: path.join(__dirname, 'index.html'),
        to: path.join(__dirname, 'dist'),
      }]
    )
  ]
};