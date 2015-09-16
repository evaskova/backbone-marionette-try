var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DEBUG = !argv.release;
var config = {
    entry: "./src/app.js",
    output: {
        path: "build/public/",
        filename: "app.js"
    },
    plugins: (DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]).concat([
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(DEBUG ? "development" : "production")
                }
            }),
            new ExtractTextPlugin('style.css'),
            new HtmlWebpackPlugin({
                filename: "../index.html",
                template: 'src/index.html'
            })
        ]),
    module: {
        loaders: [
            {
                test: /\.(eot|ttf)$/,
                loader: 'file'
            },
            {
                test: /\.woff2?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.svg/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.hbs/,
                loader: 'handlebars'
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;