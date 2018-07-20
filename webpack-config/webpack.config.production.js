const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//如果是同一个MiniCssExtractPlugin实例，那多个loader配置(css、less、sass)会打包到同一个css文件里
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  //最佳化，最优化
  optimization: {
    //minimize:使减少(或缩小)到最低限度，使减至最少，使缩到最小：
    minimizer: [
      new UglifyjsWebpackPlugin()
      , new OptimizeCssAssetsWebpackPlugin()
    ]
  }

  , module: {
    rules: [
      {
        test: /\.css$/

        //css-loader解析处理css引入的路径(url，背景图啊，外链的一些css文件啊)
        //style-loader用来把CSS代码转换成JS代码，在指定的时候会向页面中注入一个style标签
        , use: [{
          //=↑= 以前叫loader，现在推荐使用use
          loader: MiniCssExtractPlugin.loader
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
      //     loader: MiniCssExtractPlugin.loader
      //     , options: {
      //       insertAt: 'top'
      //     }
      //   }, 'css-loader', 'sass-loader']
      // }

      //less

      // , {
      //   test: /\.less/
      //   , use: [{
      //     loader: MiniCssExtractPlugin.loader
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
      template: './public/index_pro.html'
      //打包后的名字
      // , filename: 'index.html'
      //压缩
      , minify: {
        //删除属性的双引号
        removeAttributeQuotes: true
        //折叠空白区域 也就是压缩代码
        ,collapseWhitespace:true
      }
      //防止缓存
      , hash: false
    })

    , new MiniCssExtractPlugin({
      //[name]是entry的名字，默认为main
      filename: 'css/[name]-[hash].css'
    })

    // ,new CleanWebpackPlugin([path.resolve(__dirname, '../dist')])

    //在打包的文件顶部插入文字
    , new webpack.BannerPlugin('code&design by Fancier')
  ]
};
