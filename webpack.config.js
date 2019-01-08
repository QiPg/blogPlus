const webpack=require('webpack');
const path=require('path');
const srcPath=path.resolve(__dirname,'src');
module.exports={
	entry:{
		'common/main':srcPath+'/common/main.js'
	},
	output:{
		path:__dirname+'/public',
		filename:'[name].js',
		publicPath:'http://localhost:8080/public'
	},
	devtool:'eval-source-map',//2
	module:{
		rules:[
           {
           	test:/\.css$/,
           	use:['style-loader','css-loader?sourceMap'] //2
           },{
           	test:/\.(png|svg|jpg|gif)$/,
           	use:['file-loader']
           }
		]
	},
	plugins:[
	  new webpack.optimize.OccurrenceOrderPlugin(),//根据模块调用次数给模块分配id,降低文件大小
      new webpack.HotModuleReplacementPlugin(),//1、HMR热替换模块
      new webpack.NoEmitOnErrorsPlugin()//报错不退出webpack进程
	]
}