const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

// module.exports = {
//   entry: './src/ilib.js'
//   , output: {
//     path: path.resolve('dist')
//     , filename: 'bound.js'
//
//     //决定导出方式 是以var变量导出，还是exports对象,还是挂载在window上什么的
//     , libraryTarget: 'var' //打包出来的模块是以var导出的 var ahhh = ...，可以直接在全局使用
//     // , libraryTarget: 'commonjs' //exports['ahhh'] = ....
//     // , libraryTarget: 'commonjs2' //module.exports = ....
//     // , libraryTarget: 'this' //this.ahhh = ...，如果在node中用指向模块，如果是浏览器指向window
//     // , libraryTarget: 'window' //window.ahhh = ... ，和var差不多
//     // , libraryTarget: 'global' //global.ahhh = ...
//
//     , library: 'ahhh' //设置var的变量名 var ahhh = ....
//   }
// };

module.exports = {
  entry: {
    //因为最终导出是以 var [name] = ... ，的形式
    //故出口的name命名不能使用'-'，推荐使用'_'替代
    'react_family': ['react', 'react-dom','react-router-dom','redux','react-redux','redux-saga','immutable','redux-immutable']
  }

  , output: {
    path: path.resolve('dist')
    //name即是索引的key值
    , filename: '[name]_dll.js'
    //libraryTarget 默认就为var
    , library: '_dll_[name]' //var _dll_react_family = xx
  }

  ,plugins:[

    //生成一个.manifest.json文件,DllReferencePlugin时会用到
    new DllPlugin({
      // 动态链接库的全局变量名称
      // ，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react_family"
      name:'_dll_[name]'
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      ,path:path.resolve(__dirname,'dist','[name].manifest.json')
    })

  ]
};
