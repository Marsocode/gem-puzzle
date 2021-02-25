/* eslint linebreak-style: ["error", "windows"] */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
  },
  // ./gem-puzzle
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    // bundle
  },
  // можем указывать расширения по умолчанию и тогда можно не писать расширения в импортах
  resolve: {
    extensions: ['.js', '.json', '.png', '.jpg', '.mp3'],
  },
  plugins: [
    new HTMLWebpackPlugin({
    // берем наш html файл в качестве шаблона для создаваемого webpack-ом html файла
      template: './index.html',
    }),
    // clean result folder
    new CleanWebpackPlugin(),
    // for pictures
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        //style-loader для добавления ссылки а css файл в head
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif|mp3)$/,
        use: ['file-loader'],
        // type: 'asset/resource',
      },
      // {
      //   test: /\.(?:gif|png|jpg|jpeg|ico)$/i,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'assets/img/[name][ext]',
      //   },
      // },
    ],
  },
};
