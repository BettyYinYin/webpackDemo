const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('bundler-webpack test case', () => {
  require('../test/unit/webpack-base-test');
});
