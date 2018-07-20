const webpack = require('webpack');
const {smart} = require('webpack-merge');
const base = require('./webpack-config/webpack.config.base');
const production = require('./webpack-config/webpack.config.production');
const development = require('./webpack-config/webpack.config.development');

module.exports = (env, argv) => {
  let isDev = argv.mode === 'development'
    , config;

  config = isDev ? smart(base, development, {
    //创建一些全局常量,在所有模块中可使用

    //注意：
    // - 如果配置的值是字符串，那么整个字符串会被当成代码片段来执行，其结果作为最终变量的值
    // - 如果配置的值不是字符串，也不是一个对象字面量，那么该值会被转为一个字符串，如 true，最后的结果是 'true'
    // - 如果配置的是一个对象字面量，那么该对象的所有 key 会以同样的方式去定义
    plugins: [
      new webpack.DefinePlugin({
        IS_DEV: isDev
      })
    ]

  }) : smart(base, production, {
    plugins: [
      new webpack.DefinePlugin({
        IS_DEV: isDev
      })
    ]

  });

  return config;
};
