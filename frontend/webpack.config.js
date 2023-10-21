const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MODE = process.env.NODE_ENV;
const PORT = process.env.FRONTEND_PORT;
const HOST = process.env.FRONTEND_HOST;
const DEBUG = process.env.DEBUG;
const API_BASE_URL = process.env.API_BASE_URL;

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./index.html",
    inject: "body",
    hash: false,
    publicPath: "/",
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: MODE,
    DEBUG: DEBUG,
    API_BASE_URL: API_BASE_URL,
  }),
];

if (MODE === "development") {
  // Development plugins
  // plugins.push(new PluginName());
}

const config = {
  mode: MODE === "production" ? "production" : "development",

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@atoms": path.resolve(__dirname, "src/components/atoms"),
      "@molecules": path.resolve(__dirname, "src/components/molecules"),
      "@organisms": path.resolve(__dirname, "src/components/organisms"),
      "@templates": path.resolve(__dirname, "src/components/templates"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@public": path.resolve(__dirname, "public"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@hocs": path.resolve(__dirname, "src/hocs"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },

  context: path.resolve(__dirname, "src"),

  entry: "./index.tsx",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["react-svg-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        type: MODE === "production" ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins,

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: PORT,
    host: HOST,
    hot: true,
    historyApiFallback: true,
  },
};

module.exports = config;
