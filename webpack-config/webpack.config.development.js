//TODO 让react支持热加载
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const path = require('path');

module.exports = {

  devServer: require('./devServer')

  //如果设置了devServer无需设置此选项
  //如果使用webpack-dev-middleware，需要开启此选项
  // ,watch:true
  // == ↕ ==
  // 只会分析entry依赖的
  // , watchOptions: {
  //   ignored:/node_modules/
  //   //一秒询问1000次
  //   ,poll:1000
  //   //500毫秒之内重复保存不会重新打包
  //   ,aggregateTimeout:500
  // }

  , module: {
    rules: [
      {
        test: /\.css$/

        //css-loader解析处理css引入的路径(url，背景图啊，外链的一些css文件啊)
        //style-loader用来把CSS代码转换成JS代码，在指定的时候会向页面中注入一个style标签
        , use: [{
          //=↑= 以前叫loader，现在推荐使用use
          loader:'style-loader'
          // loader: MiniCssExtractPlugin.loader
          , options: {
            //在<header>底部插入还是顶部插入,默认是底部
            insertAt: 'top'
          }
        }, 'css-loader', 'postcss-loader']

      }

      //sass

      // , {
      //   test: /\.scss/
      //   , use: [{
      //     loader:'style-loader'
      //     , options: {
      //       insertAt: 'top'
      //     }
      //   }, 'css-loader', 'sass-loader']
      // }

      //less

      // , {
      //   test: /\.less/
      //   , use: [{
      //     loader:'style-loader'
      //     , options: {
      //       insertAt: 'top'
      //     }
      //   }, 'css-loader', 'less-loader']
      // }
    ]
  }

  , plugins: [
    new HtmlWebpackPlugin({
      //模板位置
      template: './public/index_dev.html'
      //打包后的名字
      // , filename: 'index.html'
      //压缩
      , minify: {
        //删除属性的双引号
        removeAttributeQuotes: false
      }
      //防止缓存
      , hash: true
    })

    ,new DllReferencePlugin({
      manifest:path.resolve(__dirname,'../dist/react_family.manifest.json')
    })

    // 用于启动 HMR 时可以显示模块的相对路径
    ,new webpack.NamedModulesPlugin()
    // Hot Module Replacement 的插件
    ,new webpack.HotModuleReplacementPlugin()
  ]

  // , devtool: 'source-map' //在单独的文件中生成，可以映射到列
  // , devtool: 'cheap-module-source-map' //在单独的文件中生成（每个打包出来的css或则js文件都有一个），不能映射到列
  // , devtool: 'eval-source-map' //在打包的文件中生成，可以映射到列
  , devtool: 'cheap-module-eval-source-map' //在打包的文件中生成，不能映射到列
};
