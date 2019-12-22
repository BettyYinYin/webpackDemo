const baseConfig = require('../../lib/webpack.base');
const assert = require('assert');

describe('webpack.base.js test case', () => {
  console.log(baseConfig);
  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'D:/webpackDemo/build-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'D:/webpackDemo/build-webpack/test/smoke/template/src/search/index.js');
  });
});
