'use strict';
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const glob = require('glob')

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        /**
         * [ 'D:/webpackDemo/src/index/index.js','D:/webpackDemo/src/search/index.js' ]
         */
        const matches = entryFile.match(/src\/([^\/]*)\/index\.js$/)
        const pageName = matches && matches[1]
        console.log('pageName', pageName)
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            minify: {
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                removeComments: false
            }
        }))

    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()
console.log('entry', entry)
module.exports = {
    // entry: {
    //     index: './src/index/index.js',
    //     search: './src/search/index.js'
    // },
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options:{
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => {
                                require('autoprefixer')()
                            }
                        }
                    },
                    
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // mini-css-extract-plugin和style-loader的功能是互斥的，只能保留一个
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options:{
                            remUnit: 75,
                            // 转换的小数位数
                            remPrecision: 8
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')()
                            ]
                        }
                    },
                    'less-loader',
                    
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                // use: 'file-loader'
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 一个html对应一个htmlWebpackPlugin
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/search/index.html'),
        //     filename: 'search.html',
        //     chunks: ['search'],
        //     minify: {
        //         html5: true,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         removeComments: false
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src/index/index.html'),
        //     filename: 'index.html',
        //     chunks: ['index'],
        //     minify: {
        //         html5: true,
        //         minifyCSS: true,
        //         minifyJS: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         removeComments: false
        //     }
        // }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins)
}