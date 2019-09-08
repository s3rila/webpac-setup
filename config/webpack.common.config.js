const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[chunkhash].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/typescript"]
          }
        }
      },
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true, url: false }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true }
          },
          {
            loader: "resolve-url-loader",
            options: {
              debug: true,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "../src/styles/scss"),
      "@img": path.resolve(__dirname, "../src/assets/images"),
      "@": path.resolve(__dirname, "../src")
    },
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js", ".ts"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Site Title",
      template: "./src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "./src/styles/style.[chunkhash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/assets/images",
        to: "assets/images"
      },
      {
        from: "./src/assets/icons/icon-dist",
        to: "assets/icons/icon-dist"
      }
    ]),
    new CleanWebpackPlugin(["dist"], {
      root: path.join(__dirname, "..")
    })
  ]
};
