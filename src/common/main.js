console.log('common.js 第三发');
require('../index/index.js');
//修改css实现ajax刷新
if(module.hot){
	module.hot.accept();
}