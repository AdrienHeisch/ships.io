const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const sharedProperties = {
    mode: process.env.NODE_ENV || "development",
    // devtool: process.env.NODE_ENV === "production" ? "source-map" : "eval",
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
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/static/", to: "./" }
        ])
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = [
    Object.assign(clientConfig, sharedProperties),
    Object.assign(serverConfig, sharedProperties)
];