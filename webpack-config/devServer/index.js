// === webpack-dev-server ===
// devServer:{}

module.exports = {
  //静态文件根目录 express.static('dist')
  contentBase: './dist'
  , port: 3000
  , host: 'localhost'

  // dev server 的配置要启动 hot，或者在命令行中带参数开启
  ,hot: true

  //默认情况下，没有修改output.publicPath值，只需要设置webpack-dev-server的historyApiFallback为true，即回退到 /index.html
  ,historyApiFallback:true

  //请求代理
  //假若本项目是 http://localhost:8080
  //你想要请求的地址为 http://localhost:3000/api
  // ，设置了该属性后，只需直接访问本项目的 /api 即可(且不仅是这一级路由， /api/user 这样的二级路由也会被代理)

  // , proxy: {
  //   "/api":"http://localhost:3000"
  //
  //   // 假若本项目是http://localhost:8080,
  //   // 如果访问 http://localhost:8080/api/user
  //   // 就会将请求转发给  http://localhost:3000/user
  //   ,pathRewrite:{'^/api':""}
  // }

  //app为webpack-dev-server内部使用的express的app
  // ,没错，devServer内部使用的就是express

  // ,before(app){
  //   app.get('/api/users',(req,res)=>{
  //     res.send({id: 1, name: 'ahhh2'});
  //   })
  // }
};
