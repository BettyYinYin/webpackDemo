const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');
const prodConfig = require('../../lib/webpack.prod');

const mocha = new Mocha({
  timeout: '10000ms',
});

// 将当前运行的目录切换到tmeplate
process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
    }));
    console.log('Webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'js-css-test.js'));

    mocha.run();
  });
});
