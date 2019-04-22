var mysql = require('mysql');
var { mysqlInfo } = require('./../../config/env');
//连接数据库
var connection = mysql.createConnection(mysqlInfo);
//激活数据库
connection.connect();

var setMyspl = {};

require('./user')(setMyspl, connection);
require('./chat')(setMyspl, connection);

module.exports = setMyspl;