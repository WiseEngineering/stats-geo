var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require ('extract-text-webpack-plugin');

var config = {
    entry: path.resolve(__dirname, './src/js/main.js'),
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: 'app.js'
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
            options: {minimize: true}
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
        }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin('../css/styles.css')
    ] : [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin('../css/styles.css')
    ],
};

module.exports = config;
