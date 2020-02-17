const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
  resolve: {
    modules: ['dist', 'node_modules'],
    extensions: ['.ts', '.js', '.json'],
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
              presets: ['@babel/preset-env'],
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
        options: {
          presets: ['@babel/preset-env'],
          babelrc: false
        },
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