const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  TerserWebpackPlugin = require('terser-webpack-plugin');

const DEV = 'development';

const isDev = process.env.NODE_ENV === DEV;
const isProd = !isDev;

const node_modules_path = './node_modules';

const optimization = () => {
  let config = {
    // splitChunks: {
    //   chunks: 'all',
    // },
    // runtimeChunk: {
    // name: 'runtime',
    // name: (entrypoint) => `runtime~${entrypoint.name}`,
    // },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
};

const filename = (ext) => {
  // return isProd ? `[name].build.${ext}` : `[fullhash].[name].bandle.${ext}`
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
    extensions: ['js', 'jsx']
  },
  resolveLoader: {
    modules: [path.resolve(node_modules_path)],
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        // JavaScript
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, './frontend/src')],
        use: ['babel-loader'],
      },
      // {
      //   test: /\.css$/,
      //   include: [
      //     path.resolve(__dirname, './english_language/assets/less')
      //   ],
      //   use: [MiniCssExtractPlugin.loader, 'css-loader']
      // },
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