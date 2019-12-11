'use strict';
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    // watch: true,
    // watchOptions:{
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    // mode: 'production',
    mode: 'development',
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                // use: 'file-loader'
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 20*1024
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/search.html',
            chunks: ['search'],
            filename: 'search.html',
        }),        
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    }
}