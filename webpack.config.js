const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(ts|tsx)$/i,
        use: ["ts-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx",".jsx", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "build"),
      publicPath: "/",
    },
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
};