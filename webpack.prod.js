'use strict';
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const glob = require('glob')
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const Happypack = require('happypack')

const smp = new SpeedMeasurePlugin()

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
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(__dirname, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      // chunks不填写会默认将所有的chunk都引入到html页面，
      // chunks的填写也是有顺序的，会根据此处数组的顺序引入到html文件中
      chunks: pageName === 'search' ? ['vendors', 'commons', pageName] : ['commons', pageName],
      // chunks: [pageName],
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

const {
  entry,
  htmlWebpackPlugins
} = setMPA()
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
  // mode: 'none',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 3
            }
          },
          // 'happypack/loader',
          'babel-loader',
          // 'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
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
            options: {
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
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    // new Happypack({
    //   loaders: ['babel-loader']
    // }),
    // new HtmlWebpackExternalsPlugin({
    //     externals: [
    //         {
    //             module: 'react',
    //             entry: 'https://cdn.bootcss.com/react/16.10.2/umd/react.production.min.js',
    //             global: 'React'
    //         },
    //         {
    //             module: 'react-dom',
    //             entry: 'https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.production.min.js',
    //             global: 'ReactDOM'
    //         }
    //     ]

    // })
    // scope hoisting插件，production模式下默认开启
    // new webpack.optimize.ModuleConcatenationPlugin()
    function () {
      this.hooks.done.tap('done', (stats) => {
        if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1){
          console.log('build error')
          process.exit(1)
        }
      })
    },
    new webpack.DllReferencePlugin({
      manifest: require('./build/library/library.json')
    })
  ].concat(htmlWebpackPlugins),
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /(react|react-dom)/,
          // name对应的是entry里面的每个chunk，这样就可以根据不同的html文件引入不同的chunk
          name: 'vendors',
          chunks: 'all'
        },
        commons: {
          minSize: 0,
          name: 'commons',
          minChunks: 3,
          chunks: 'all'
        }
      }
    }
  },
  // stats: 'errors-only',
  // performance: {
  //   hints: 'warning',
  //   maxAssetSize: 30000000,
  //   maxEntrypointSize: 50000000
  // }
}
