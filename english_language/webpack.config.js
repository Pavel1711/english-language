const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const node_modules_path = './node_modules';


const filename = (ext) => {
  return `[name].bundle.${ext}`
};

const APPS_PATH = './frontend/src';

module.exports = {
  entry: {
    index: path.resolve(__dirname, APPS_PATH, 'index.js'),
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, './english_language/assets/js'),
  },
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(node_modules_path)],
    extensions: ['js', 'jsx'],
  },
  resolveLoader: {
    modules: [path.resolve(node_modules_path)],
  },
  module: {
    rules: [
      {
        // JavaScript
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, './frontend/src')],
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './english_language/assets/css')
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, './frontend/src/less')],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ],
};