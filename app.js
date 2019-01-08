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
	noInfo:true,//控制台不显示信息（只有警告和错误）
	// stats:{
	// 	colors:true//控制台打印颜色
	// },
	 publicPath:webpackConfig.output.publicPath  //前缀访问地址
}));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/',(req,res,next)=>{
     res.render('index');
});
app.listen(8080,()=>{
	console.log('web服务启动成功');
})