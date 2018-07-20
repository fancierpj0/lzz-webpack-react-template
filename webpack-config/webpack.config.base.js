const path = require('path');

module.exports = {
  entry: './src/index.js'

  , output: {
    filename: 'boundle-[hash:7].js'

    //获取到的是当前文件的目录的绝对路径(包含本身的目录名)
    , path: path.resolve(__dirname, '../dist')

    //这里设置publicPath
    // ，会将所有html里的路径(js的src、css的href、img的src)
    // 和backgroundのurl 都加上 '/public'的前缀
    , publicPath: '/public'
  }

  , resolve: {
    //指定extension之后可以不用在require或是import的时候手动添加文件扩展名，会依次按照extensions的设置尝试添加扩展名后再进行匹配
    extensions: ['.js', '.jsx', '.json', '.css']

    //自定义路径解析
    , alias: require('./alias')

    //指定import 'xx'/require('xx'),不带'./'时,模块的查找路径
    // , modules: [
    //   path.resolve(__dirname,'node_modules')
    // ]
    //npm包查找是这样查找的
    //先在node_modules里找文件夹
    // ，然后找package.json里main字段设置的
    // ==↓== 这里可以配置不从package.json里main字段而是从其它字段查找入口文件
    , mainFields: ['main', 'style']
    // ，最后再找index.js，找不到就报错咯
    // ==↓== 这里可以指定入口字段的值
    , mainFiles: ['index', 'main']

    //resolve也可针对某个loader单独进行设置
    //，可配置项同上面

    // ,resolveLoaders:{
    //   alias:[]
    //  ,modules:[]
    // }

  }

  , module: {
    //配置不需要loader进行解析的模块
    //通常为 不需要解析依赖（即无依赖） 的第三方大型类库
    //注意：使用noParse进行忽略的模块文件中不能使用important、require、define等浏览器不能直接识别的东东，否则死翘翘
    // noParse(content){ //content即是import/require时的包
    //   return noParse:/jquery|lodash/.test(content);
    // }
    noParse: /jquery|lodash/

    , rules: [

      //react and es6+ env
      {
        test: /\.jsx?$/

        , use: [{
          loader: 'babel-loader'
          , options: {
            presets: ['env', 'stage-0', 'react']
            , plugins: ['transform-decorators-legacy']
          }
        }]

        , include: path.resolve(__dirname,'../src')

        , exclude: /node_modules/
      }

      //图片
      ,{
        test: /\.(gif|jpg|jpeg|png|bmp|eot|woff|woff2|ttf|svg)$/
        , use: [
          {
            loader: 'url-loader'
            , options: {
              limit: 4096
              , outputPath: 'images'
              //注意：这个修改的是经过url-loader处理的引入路径
              //,而不是图片的导出路径
              , publicPath: '/images'
            }
          }
        ]
      }

      //处理html中的imgのsrc
      , {
        test: /\.html/
        , use: 'html-withimg-loader'
      }
    ]
  }

  , plugins: [
    //忽略第三方库中的某些非必须依赖
    //比如这里：
    //忽略moment文件夹下local文件夹
    //第一个是匹配引入模块路径的正则表达式
    // , new webpack.IgnorePlugin(/^\.\/local/,/moment$/)

    //copy
    // , new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/assets')
    //     , to: path.resolve(__dirname, 'dist/')
    //   }
    // ])


    //为每个模块注入某个第三方模块，这样就无需再手动import
    //例如这里：
    //将lodash模块赋给_，这样我们在每个模块中都无需再手动引用lodash(import _ from 'lodash')
    //注意，这并不是设置在全局上的全局变量，只是webpack帮我们在每个需要的模块中都注入了import而已
    // ，如果想要在全局下注入一个模块，则推荐使用expose-loader
    // require('expose-loader?jQuery!jquery');
    //?后是传参，expose-loader?jQuery!jquery，意思是window.jQuery = jquery

    // ,new webpack.ProvidePlugin({
    //   "_":"lodash"
    // })

  ]

  //如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或则window/global全局等方式进行使用，那就可以通过配置externals来实现
  //比如：通过加载CDN来引入第三方库
  // <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
  , externals: {
    //这个大写的jQuery是引入CDN注入的全局对象的名字(window.jQuery)
    //jquery是我们在模块中import $ from 'jquery'的jquery

    // jquery: 'jQuery'
  }

};
