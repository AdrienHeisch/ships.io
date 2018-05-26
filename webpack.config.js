const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = "development";

module.exports = [
    {
        name: "server",
        mode,
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
    },
    {
        name: "client",
        mode,
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
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        }
    }
];