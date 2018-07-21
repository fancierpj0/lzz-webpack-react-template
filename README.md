## how to use
```
npm i

npm run build:lib
```
development
↓
```
npm start
```
production
↓
```
npm run build
```

## splitChunks

### 配置项
```
,splitChunks:{
//cacheGroup里的key等同于这里的name
name:true

// 最小尺寸必须大于此值，默认30000B
// ,minSize:0

// 其他entry引用次数大于此值，默认1
// ,minChunks:1

//优先级，多个分组冲突时决定把代码放在哪块，是个数值，支持负数
// ,priority:1

//entry文件请求的chunks不应该超过此值
// ,maxInitialRequests:5

//异步请求的chunks不应该超过此值
// ,maxAsyncRequests:5

//自动命名连接符
// ,automaticNameDelimiter:'~'

//表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块
// ,reuseExistingChunk:true

//cacheGroup
//之所以叫cacheGroup
//，是因为和浏览器缓存相关
// ，cacheGroups里抽离出来的代码应该是不经常变更的那种代码，这样就能放心享受浏览器缓存机制带来的福利
  ,cacheGroups:{
    preact:{

      test:/preact/

      //值为"initial", "async"（默认） 或 "all"
      //1. initial 入口chunk，对于异步导入的文件不处理
      //2. async 异步chunk，只对异步导入的文件处理（个人理解）
      //3. all 皆可
      ,chunks:'initial'
    }
  }
}
```
### 其它注意事项
- cacheGroups 会继承和覆盖splitChunks的配置项，但是test、priorty和reuseExistingChunk只能用于配置缓存组。。
- cacheGroups 里的每一项最好都要加上chunks参数，不然可能打包不出来你想要的东西。
- minSize 默认是30KB（注意这个体积是压缩之前的）在小于30kb的情况下一定要设置一个值，否则也可能打包不出来你想要的东西，而且这东西要加在cacheGroups里面。
- priority 在某些情况下，还是挺有用的，可以设置打包chunks的优先级。

### 【备忘】production模式下 splitChunksの默认配置
```
splitChunks: {
    chunks: "async",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        default: {//cacheGroups重写继承配置，设为false不继承
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
```
