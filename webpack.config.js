'use strict';

/* Require Modules */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* Set Environment */
var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';


module.exports = function makeWebpackConfig() {
    var config = {
        entry: {
            app: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: isProd ? './' : 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        devtool: isProd ? '' : 'inline-source-map'
    };

    /* Resolve Module */
    config.resolve = {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    };

    /* Rules aka Loaders */
    config.module = {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {}
            }
        }]
    };

    /* Plugins */
    config.plugins = [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        })
    ];

    /* Dev server configuration */
    config.devServer = {
        contentBase: './src/public/',
        stats: 'minimal' // https://webpack.js.org/configuration/stats/
    };

    return config;
}();