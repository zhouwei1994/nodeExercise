module.exports = function (setMyspl, connection) {
    //注册录入
    setMyspl.registerDao = function (username, nickname, password) {
        return new Promise((resolve, reject) => {
            var splText = 'INSERT INTO `user` (username,nickname,password) VALUES ("' + username + '","' + nickname + '","' + password + '")';
            connection.query(splText, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //根据用户名查询
    setMyspl.queryUserNameDao = function (username) {
        return new Promise((resolve, reject) => {
            var splText = 'select count(*) as total from user where username= "' + username + '"';
            connection.query(splText, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows[0].total);
                }
            });
        });
    }
    // 根据用户名搜索用户
    setMyspl.searchFriendSpl = function (username) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT nickname,headImg,id,username,online FROM user WHERE username = "${username}"`, function (err, rows, newfields) {
                if (err) {
                    throw err;
                } else {
                    console.log(rows);
                    resolve(rows);
                }
            });
        });
    }
    //根据用户名密码查询
    setMyspl.loginDao = function (username, password) {
        return new Promise((resolve, reject) => {
            var splText = `SELECT nickname,headImg,id,username from user where username='${username}' and password='${password}'`;
            connection.query(splText, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //根据用户ID查询
    setMyspl.userIdDao = function (id) {
        return new Promise((resolve, reject) => {
            var splText = `SELECT nickname,headImg,id,username from user where id='${id}'`;
            connection.query(splText, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //用户头像、昵称
    setMyspl.modifyUserInfoSpl = function (userId, headImg, nickname) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET headImg = '${headImg}', nickname = '${nickname}' WHERE id = '${userId}'`, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //申请添加好友
    setMyspl.addFriendSpl = function (userId, acceptID, reason) {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO add_friend (submitUser,acceptUser,reason,state) VALUES ("${userId}","${acceptID}","${reason}",1001)`, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //查询好友申请记录
    setMyspl.friendRecordingSpl = function (userId, acceptID) {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM add_friend WHERE submitUser = "${userId}" and acceptUser = "${acceptID}" and state= "1001"`,
                function (err, rows, fields) {
                    if (err) {
                        throw err;
                    } else {
                        resolve(rows);
                    }
                });

        });
    }
    //同意|拒绝添加好友
    setMyspl.agreeAddFriendSpl = function (userId, id, state) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE add_friend SET state = "${state}" WHERE id = "${id}" and acceptUser = "${userId}"`, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //同意|拒绝添加好友
    setMyspl.agreeAddFriendSpl = function (userId, id, state) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE add_friend SET state = "${state}" WHERE id = "${id}" and acceptUser = "${userId}"`, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
}