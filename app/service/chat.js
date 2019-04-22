var {
    insertNews,
    unreadListspl,
    messageRecordSpl,
    clearUnreadSpl,
    userOnlineSpl
} = require('./../dao/index');
// var {
//     boardcast
// } = require('./../module/socket');
module.exports = {
    //储存消息
    touristsNews: function (fromUser, toUser, content, type, haveRead) {
        return new Promise((resolve, reject) => {
            insertNews(fromUser, toUser, content, type, haveRead).then(
                data => {
                    resolve(data);
                }
            );
        });
    },
    //未读列表消息数/是否在线
    unreadList: function (fromUser, userId) {
        return new Promise((resolve, reject) => {
            var fromUserList = [];
            fromUser.forEach((item, index) => {
                if (item != null && item != "" && item != "null") {
                    fromUserList.push(item);
                }
            });
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            unreadListspl(fromUserList, userId).then(
                data => {
                    if (data.length <= 0) {
                        resolve(global.apiInfo([]));
                    } else {
                        resolve(global.apiInfo(data));
                    }
                }
            );
        });
    },
    //获取消息记录 
    messageRecord: function (userId, toUser, pageNo = 1, pageSize = 10) {
        if (!userId) {
            resolve(global.apiInfo('', 300, 'userId为空'));
            return;
        }
        if (!toUser) {
            resolve(global.apiInfo('', 300, 'toUser为空'));
            return;
        }
        return new Promise((resolve, reject) => {
            messageRecordSpl(userId, toUser, pageNo, pageSize).then(
                data => {
                    if (data.length <= 0) {
                        resolve(global.apiInfo('', 300, '无消息记录'));
                    } else {
                        clearUnreadSpl(userId, toUser).then(
                            res => {
                                if (res.changedRows > 0) {
                                    global.boardcast({
                                        type: "haveRead",
                                        fromUser: userId
                                    }, [toUser]);
                                }
                                resolve(global.apiInfo(data));
                            }
                        );
                    }
                }
            );
        });
    },
    //清除未读消息
    clearUnread: function (userId, fromUser) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            if (!fromUser) {
                resolve(global.apiInfo('', 300, 'fromUser为空'));
                return;
            }
            clearUnreadSpl(userId, toUser, pageNo, pageSize).then(
                data => {
                    if (data.length <= 0) {
                        resolve(global.apiInfo('', 300, '无消息记录'));
                    } else {
                        resolve(global.apiInfo(data));
                    }
                }
            );
        });
    },
    //用户在线、离线
    userOnline: function (userId, online = 0) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            userOnlineSpl(userId, online).then(
                data => {
                    resolve(global.apiInfo('', 200, '成功'));
                }
            );
        });
    },
}