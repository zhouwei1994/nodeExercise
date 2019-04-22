var express = require('express');
// 路径操作
var path = require('path');
var favicon = require('serve-favicon');
// 日志中间件
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

///=======路由信息 （接口地址）开始 存放在./routes目录下===========//
var routes = require('./routes/index'); // page接口

//常用工具
require('./utils/utils');


//定义模板（views ）搜索路径，在根目录的 views 文件夹下,可自定义
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎 为： EJS, 可自定义
app.set('view engine', 'ejs');
// 将您的图标放入/公开后取消注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 使用app.use(logger('dev'));可以将请求信息打印在控制台
app.use(logger('dev'));
// 修改bodyParser接收的最大值, 不然会报错
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(cookieParser());
//指定静态文件名称是 public, 文件夹名可自定义
app.use(express.static(path.join(__dirname, 'public')));



//为 Express 设置代理
app.set('trust proxy', function (ip) {
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // 受信的 IP 地址
    else return false;
});

//在app中注册routes该接口
app.use('/', routes);

// 赶上404并转发到错误处理程序
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误处理程序
app.use(function (err, req, res, next) {
    // 设置当地人，只提供发展中的错误
    console.log(err.message);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // 呈现错误页面
    res.status(err.status || 500);
    res.send(global.apiInfo('', err.status, err.message));
});

module.exports = app;