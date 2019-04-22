module.exports = function (setMyspl, connection) {
    //插入聊天记录
    setMyspl.insertNews = function (fromUser, toUser, content, type, haveRead) {
        //news_state = 0 代表系统默认发送
        return new Promise((resolve, reject) => {
            var itme = new Date().format();
            var splText = `INSERT INTO news (fromUser,toUser,content,type,haveRead) VALUES ('${fromUser}','${toUser}','${content}','${type}','${haveRead}')`;
            connection.query(splText, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(itme);
                }
            });
        });
    }
    //查询所有未读消息
    setMyspl.unreadListspl = function (fromUser, userId) {
        fromUser = fromUser.join(",");
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id as fromUser,a.toUser,
            b.nickname,b.headImg,
            substring_index(group_concat( a.sendTime order by a.sendTime desc ),',',1) sendTime,
            substring_index(group_concat( a.content order by a.sendTime desc ),',',1) content,
            substring_index(group_concat( a.type order by a.sendTime desc ),',',1) type,
            b.online, 
            SUM(haveRead) as haveRead
            FROM NEWS a RIGHT JOIN USER b ON  b.id = a.fromUser and a.toUser = '${userId}'  WHERE 
             ${fromUser ? "b.id in ("+fromUser+")":"a.haveRead = '1'"} GROUP BY b.id order by sendTime DESC;
            `, function (err, rows, fields) {
                if (err) {
                    throw err;
                } else {
                    resolve(rows);
                }
            });
        });
    }
    //查询消息记录
    setMyspl.messageRecordSpl = function (userId, toUser, pageNo, pageSize) {
        if (pageNo == 1) {
            pageNo = 0;
        } else {
            pageNo = 3 + (pageNo - 2) * pageSize;
        }
        return new Promise((resolve, reject) => {
            connection.query(`SELECT COUNT(*) as total FROM NEWS WHERE (FROMUSER = ${userId} AND TOUSER=${toUser}) OR (FROMUSER=${toUser} AND TOUSER=${userId})`,
                function (err, rows, fields) {
                    if (err) {
                        throw err;
                    } else {
                        if (rows[0].total > 0) {
                            console.log(`SELECT a.*,b.nickname,b.headImg FROM NEWS a,USER b WHERE a.fromUser = b.id AND ((a.FROMUSER = ${userId} AND a.TOUSER=${toUser}) OR (a.FROMUSER=${toUser} AND a.TOUSER=${userId})) order by sendTime DESC LIMIT ${pageNo},${pageSize}`);
                            connection.query(`SELECT a.*,b.nickname,b.headImg FROM NEWS a,USER b WHERE a.fromUser = b.id AND ((a.FROMUSER = ${userId} AND a.TOUSER=${toUser}) OR (a.FROMUSER=${toUser} AND a.TOUSER=${userId})) order by sendTime DESC LIMIT ${pageNo},${pageSize}`, function (newerr, newrows, newfields) {
                                if (newerr) {
                                    throw newerr;
                                } else {
                                    resolve({
                                        total: rows[0].total,
                                        list: newrows
                                    });
                                }
                            });
                        } else {
                            resolve({
                                total: 0,
                                list: []
                            });
                        }
                    }
                })
        })
    }
    // 清除未读消息
    setMyspl.clearUnreadSpl = function (userId, toUser) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE news SET haveRead = 0 WHERE fromUser = ${toUser} and toUser = ${userId} and haveRead = 1`,
                function (err, rows, fields) {
                    if (err) {
                        throw err;
                    } else {
                        resolve(rows);
                    }
                })
        })
    }
    // 用户在线、离线
    setMyspl.userOnlineSpl = function (userId, online) {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE user SET online = ${online} WHERE id = ${userId}`,
                function (err, rows, fields) {
                    if (err) {
                        throw err;
                    } else {
                        resolve(rows);
                    }
                })
        })
    }
}