var ws = require("nodejs-websocket");
var {
    touristsNews,
    userOnline
} = require('./../service/chat');
let server;

function socketServer() {
    console.log("开始建立连接...");
    server = ws.createServer(function (conn) {
        console.log(conn);
        // 收到文本时触发， str 时收到的文本字符串
        conn.on("text", function (str) {
            // const data = JSON.parse(str);
            console.log(str);
            // conn.sendText(`<?xml version="1.0" ?> 
            // <cross-domain-policy> 
            //     <site-control permitted-cross-domain-policies="all"/> 
            //     <allow-access-from domain="*" to-ports="*" secure="false"/> 
            //     <allow-http-request-headers-from domain="*" headers="*"/> 
            // </cross-domain-policy>\0`);
            //第一次发送信息，用户数据
            // if (data.type == "first") {
            //     conn.id = data.id;
            //     userOnline(data.id, 1);
            // } else if (data.type == "haveRead") {
            //     global.boardcast({
            //         fromUser: data.fromUser,
            //         type: data.type,
            //     }, [data.toUser]);
            // } else {
            //     global.boardcast({
            //         fromUser: conn.id,
            //         toUser: data.toUser,
            //         content: data.content,
            //         nickname: data.nickname,
            //         headImg: data.headImg,
            //         type: data.type,
            //         sendTime: new Date().format()
            //     }, [data.toUser]);
            // }
        });
        conn.on("close", function (code, reason) {
            userOnline(conn.id, 0);
            console.log("关闭连接", code, reason);
        });
        conn.on("error", function (code, reason) {
            // 某些情况如果客户端多次触发连接关闭，会导致connection.close()出现异常，这里try/catch一下
            try {
                conn.close();
            } catch (error) {
                console.log('close异常', error)
            }
            console.log('异常关闭', code, reason)
        });

    }).listen(8000);

    // 建立新链接（ 完成握手后） 触发， conn 是连接的实例对象
    // server.on('connection', (conn) => {
    // 一个常量，表示连接的当前状态
    // 值为 0， 表示正在连接
    // 值为 1， 表示连接成功， 可以通信了
    // 值为 2， 表示连接正在关闭。
    // 值为 3， 表示连接已经关闭， 或者打开连接失败。
    // console.log(conn.readyState);
    // console.log("成功建立握手", conn);
    // });
    // console.log("WebSocket建立完毕");
    // 服务端广播,可以用来广播所有消息
    // server.connections.forEach(function (conn) {
    //     conn.sendText(msg)
    // });
    // 关闭websocket服务
    // server.close();
}
//发送消息
global.boardcast = function (data, users) {
    console.log(server.connections);
    server.connections.forEach(function (conn) {
        let state = false;
        users.forEach(item => {
            if (item == conn.id) {
                state = true;
            }
        });
        if (state) {
            conn.sendText(JSON.stringify(data));
        }
    });
    if (data.type !== "haveRead") {
        touristsNews(data.fromUser, data.toUser, data.content, data.type, 1);
    }
}
module.exports = {
    socketServer: socketServer,
};