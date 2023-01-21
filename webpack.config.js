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

const APPS_PATH = './frontend/src/apps';

// TODO: когда оттестим на проде, можно будем заменить "source-map" прода на 'null'
module.exports = {
  entry: {
    main: path.resolve(__dirname, APPS_PATH, 'main.js'),
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, './bakery/assets/js'),
  },
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(node_modules_path)],
    // Позволяет не указывать тип файла при импортировании
    // extensions: ['js'],
    // Используется для удобного доступа и импорта
    alias: {
      src: path.resolve(__dirname, './frontend/src'),
    },
  },
  optimization: optimization(),
  module: {
    rules: [
      {
        // JavaScript
        test: /\.js$/,
        include: [path.resolve(__dirname, './frontend/src')],
        use: ['babel-loader'],
      },
      // {
      //   test: /\.css$/,
      //   include: [
      //     path.resolve(__dirname, './bakery/assets/less')
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