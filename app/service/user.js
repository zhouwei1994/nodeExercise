var {
    registerDao,
    queryUserNameDao,
    loginDao,
    searchFriendSpl,
    userIdDao,
    modifyUserInfoSpl,
    addFriendSpl,
    friendRecordingSpl,
    agreeAddFriendSpl
} = require('./../dao/index');
module.exports = {
    //用户注册
    registerService: function (username, nickname, password) {
        return new Promise((resolve, reject) => {
            if (!username) {
                resolve(global.apiInfo('', 301, '用户名不能为空'));
            } else if (!password) {
                resolve(global.apiInfo('', 302, '密码不能为空'));
            } else {
                //查询用户名
                queryUserNameDao(username).then(
                    data => {
                        if (data <= 0) {
                            registerDao(username, nickname, password).then(
                                data => {
                                    resolve(global.apiInfo());
                                }
                            );
                        } else {
                            resolve(global.apiInfo('', 500, '用户名已注册'));
                        }
                    }
                );
            }
        });
    },
    //用户登录
    loginService: function (username, password) {
        return new Promise((resolve, reject) => {
            if (!username) {
                resolve(global.apiInfo('', 301, '用户名不能为空'));
            } else if (!password) {
                resolve(global.apiInfo('', 302, '密码不能为空'));
            } else {
                loginDao(username, password).then(
                    data => {
                        if (data.length <= 0) {
                            resolve(global.apiInfo('', 500, '用户名或密码错误'));
                        } else {
                            resolve(global.apiInfo(data[0]));
                        }
                    }
                );
            }
        });
    },
    //根据用户ID查询
    getUserInfoService: function (id) {
        return new Promise((resolve, reject) => {
            userIdDao(id).then(
                data => {
                    if (data <= 0) {
                        resolve(global.apiInfo('', 500, '未找到该用户'));
                    } else {
                        resolve(global.apiInfo(data[0]));
                    }
                }
            );
        });
    },
    //根据用户名搜索用户
    searchFriend: function (username) {
        return new Promise((resolve, reject) => {
            if (!username) {
                resolve(global.apiInfo('', 300, 'username为空'));
            } else {
                searchFriendSpl(username).then(
                    data => {
                        if (data <= 0) {
                            resolve(global.apiInfo('', 300, '查找不到该用户'));
                        } else {
                            resolve(global.apiInfo(data[0]));
                        }
                    }
                );
            }
        });
    },
    //修改用户头像、昵称
    modifyUserInfo: function (userId, headImg, nickname) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            if (!headImg) {
                resolve(global.apiInfo('', 300, 'headImg为空'));
                return;
            }
            if (!nickname) {
                resolve(global.apiInfo('', 300, 'nickname为空'));
                return;
            }
            modifyUserInfoSpl(userId, headImg, nickname).then(
                data => {
                    console.log(data);
                    if (data.affectedRows == 0) {
                        resolve(global.apiInfo('', 300, '修改失败'));
                    } else {
                        resolve(global.apiInfo());
                    }
                }
            );
        });
    },
    //申请添加好友
    addFriendService: function (userId, acceptID, reason) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            if (!acceptID) {
                resolve(global.apiInfo('', 300, 'acceptID为空'));
                return;
            }
            if (!reason) {
                resolve(global.apiInfo('', 300, 'reason为空'));
                return;
            }
            friendRecordingSpl(userId, acceptID).then(
                data => {
                    if (data.length >= 1) {
                        resolve(global.apiInfo('', 300, '您已在对方的好友申请列表中'));
                    } else {
                        addFriendSpl(userId, acceptID, reason).then(
                            data => {
                                if (data.affectedRows == 0) {
                                    resolve(global.apiInfo('', 300, '申请失败'));
                                } else {
                                    resolve(global.apiInfo());
                                }
                            }
                        );
                    }
                }
            );
        });
    },
    //同意|拒绝添加好友
    agreeAddFriendService: function (userId, id, state) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                resolve(global.apiInfo('', 300, 'userId为空'));
                return;
            }
            if (!id) {
                resolve(global.apiInfo('', 300, 'id为空'));
                return;
            }
            if (!state) {
                resolve(global.apiInfo('', 300, 'state为空'));
                return;
            }
            agreeAddFriendSpl(userId, id, state).then(
                data => {
                    console.log(data);
                    if (data.affectedRows == 0) {
                        resolve(global.apiInfo('', 300, '提交失败'));
                    } else {
                        resolve(global.apiInfo());
                    }
                }
            );
        });
    }
}