const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// process.env.NODE_ENV = "production"  // uncomment to build in production mode

const sharedProperties = {
    mode: process.env.NODE_ENV || "development",
    devtool: process.env.NODE_ENV === "production" ? "source-map" : "cheap-module-eval-source-map",
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    }
}

const serverConfig = {
    name: "server",
    target: 'node',
    entry: "./src/server-index.js",
    output: {
        path: path.resolve("./dist/"),
        filename: "server.js"
    },
    node: {
        fs: "empty",
        net: "empty"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/static/", to: "./" }
        ]),
        new ForkTsCheckerWebpackPlugin()
    ],
    externals: [
        nodeExternals()
    ]
}

const clientConfig = {
    name: "client",
    entry: "./src/client-index.js",
    output: {
        path: path.resolve("./dist/public/"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                loader: 'file-loader',
                exclude: '/config',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
}

module.exports = [
    Object.assign(clientConfig, sharedProperties),
    Object.assign(serverConfig, sharedProperties)
];