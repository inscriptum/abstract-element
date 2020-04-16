const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');



module.exports = {
  resolve: {
    modules: ['dist', 'node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'abstract-element': path.resolve(__dirname, '../lib'),
      "abstract-element/render/hyper": path.resolve(__dirname, '../lib/render/hyper'),
      "abstract-element/render/lit": path.resolve(__dirname, '../lib/render/lit')
    }
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 8081,
  },
  devtool: 'eval-cheap-source-map',
  entry: {
    'template-literals': path.join(__dirname, 'template-literals', 'index.ts'),
    'lit-html-render': path.join(__dirname, 'jsx', 'lit-html-render', 'index.tsx'),
    'hyperhtml-render': path.join(__dirname, 'jsx', 'hyperhtml-render', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader",
            // options: require('./babel.config')
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
        options: require('./babel.config'),
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
    ),
    new webpack.ProvidePlugin({
      html: 'lit-html'
    })
  ]
};