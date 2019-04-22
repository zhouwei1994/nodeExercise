/**
 * 模块依赖关系。
 */
//express配置文件
var app = require('./app');
// debug模式
var debug = require('debug')('expressapp:server');
var http = require('http').createServer(app);
var {
    port
} = require('./config/env');
var {
    socketServer
} = require('./app/module/socket');
//启动socket服务
socketServer();
app.set('port', port);
/**
 * 在所有网络接口上监听提供的端口。
 */
http.listen(port, function () {
    console.log('http://localhost:' + port);
});
http.on('error', onError);
http.on('listening', onListening);

/**
 * HTTP服务器“错误”事件的事件侦听器。
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof myport === 'string' ?
        'Pipe ' + myport :
        'Port ' + myport;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * HTTP服务器“侦听”事件的事件侦听器。
 */

function onListening() {
    var addr = http.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}