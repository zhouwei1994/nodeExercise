var {
    unreadList,
    messageRecord
} = require('./../app/service/chat');
module.exports = function (router) {
    //获取房间消息记录
    router.get('/messageRecord', function (req, res) {
        var userId = req.query.userId;
        var toUser = req.query.toUser;
        var pageNo = req.query.pageNo;
        var pageSize = req.query.pageSize;
        messageRecord(userId, toUser, pageNo, pageSize).then(data => {
            res.send(data);
        });
    });
    //根据fromUser、userId获取未读列表
    router.post('/unreadList', function (req, res) {
        var fromUser = req.body.fromUser;
        var userId = req.body.userId;
        unreadList(fromUser, userId).then(data => {
            res.send(data);
        });
    });
}