//入口层

//保存当前文件的绝对路径
global.__basename = __dirname;

//导入path(核心模块)
global.path = require('path');

//导入服务器基础配置
global.config = require(path.resolve(__basename, 'config/config.js'));

//导入express模块
const express = require('express');

//导入body-parser处理请求体模块
const bodyParser = require('body-parser');

//导入中间件
let middleWare = require(path.resolve(__basename, 'middleWare/intercept.js'));

//导入路由层
let routes = require(path.resolve(__basename, 'routes/routes.js'));

//连接mysql, 并且全局保存连接实例
global.sequelize = require(path.resolve(__basename, 'db/connect.js'));

//导入所有模型
global.model = require(path.resolve(__basename, 'db/model/model.js'));

//导入service
global.api = require(path.resolve(__basename, 'service/api.js'));

//导入utils
global.utils = require(path.resolve(__basename, 'utils/utils.js'));

//创建express实例
let app = express();

//会在req对象添加一个body属性, 该属性保存在post请求体的参数
//解析post请求体 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: config.serverOptions.limitBody }));
//解析 application/json
app.use(bodyParser.json({limit: config.serverOptions.limitBody}));

//设置静态目录
app.use(config.staticBaseUrl.base, express.static(path.resolve(__basename, 'upload')));

//加载中间层
middleWare(app);

//加载路由接口
routes(app);

app.listen(config.serverOptions.port, () => {
  console.log(`the server running at ${config.serverOptions.host}:${config.serverOptions.port}`);
})