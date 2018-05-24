const webpack = require("webpack");
const path = require("path");

const mode = "development";

module.exports = [
    {
        name: "server",
        mode,
        target: 'node',
        entry: "./src/server-index.js",
        context: path.resolve("./"),
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
        }
    },
    {
        name: "client",
        mode,
        entry: "./src/client-index.js",
        context: path.resolve("./"),
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