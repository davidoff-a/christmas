const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const noUiSlider = require('nouislider');

const devServer = (isDev) => (!isDev
  ? {}
  : {
    devServer: {
      open: true,
      hot: true,
      port: 8080,
    },
  });

const esLintPlugin = (isDev) => (isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })]);

module.exports = ({ dev }) => ({
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'inline-source-map' : false,
  entry: ['@babel/polyfill', './src/index.ts'],
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  plugins: [
    ...esLintPlugin(dev),
    new HTMLWebpackPlugin({
      title: 'merryChristmas',
      // template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/toys/',
          to: 'assets',
        },
        {
          from: './src/assets/svg/',
          to: 'assets',
        },
        {
          from: './src/assets/audio/',
          to: 'assets',
        },
        {
          from: './src/assets/bg/',
          to: 'assets',
        },
        {
          from: './src/assets/tree/',
          to: 'assets',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [dev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.d.ts', '.js'],
  },
  ...devServer(dev),
});
