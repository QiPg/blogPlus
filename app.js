const express=require('express');
const swig=require('swig');
const app=express();

app.use('/public',express.static(__dirname+'/public'));//静态资源
 //配置应用模板(模板引擎的名称，同时也是模板文件的后缀、解析处理引擎模板内容的方法)
app.engine('html',swig.renderFile);
//设置模板文件存放的目录（固定的views、目录）
app.set('views','./server/views');
//注册所使用的模板引擎 (固定的 view engine、和app.engine中定义的模板引擎的名称是一样的)
app.set('view engine','html');
//设置不缓存
swig.setDefaults({
	cache:false
})
//调用webpack配置3
const webpackDev=require('webpack-dev-middleware');
const webpack=require('webpack');
const webpackConfig=require('./webpack.config.js');
const compiler=webpack(webpackConfig);

app.use(webpackDev(compiler,{
	noInfo:true,
	publicPath:webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use('./',require('./server/routers/api'))

app.get('/',(req,res,next)=>{
     console.log('来了');
     res.render('index');
});
const browserSync=require('browser-sync').create();
const reload =require('reload');
const http=require('http');
const server= http.createServer(app);
reload(app);
server.listen(3000,()=>{
        browserSync.init({
            ui:false,
            open:false,
            online:false,
            notify:false,
            proxy: 'http://localhost:3000',
            files: './server/views/**',
            port: 3000
        }, () => {
          console.log('开发模式，代理服务器启动成功')
        });
  });