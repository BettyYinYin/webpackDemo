## 使用ESLint规范构建脚本
使用 eslint-config-airbnb-base
eslint --fix可以自动处理空格
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true
  }
}