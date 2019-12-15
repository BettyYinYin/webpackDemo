const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const cssnano = require('cssnano');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://cdn.bootcss.com/react/16.10.2/umd/react.production.min.js',
        global: 'React',
      },
      {
        module: 'react-dom',
        entry: 'https://cdn.bootcss.com/react-dom/16.10.2/umd/react-dom.production.min.js',
        global: 'ReactDOM',
      },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // vendor: {
        //   test: /(react|react-dom)/,
        //   // name对应的是entry里面的每个chunk，这样就可以根据不同的html文件引入不同的chunk
        //   name: 'vendors',
        //   chunks: 'all'
        // },
        commons: {
          minSize: 0,
          name: 'commons',
          minChunks: 2,
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = merge(baseConfig, ssrConfig);
