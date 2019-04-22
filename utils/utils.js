const crypto = require('crypto');
//密文
const ciphertext = 'hex';
//信息模版
global.apiInfo = function (data = '', code = 200, msg = 'success') {
    return {
        code: code,
        data: data,
        msg: msg
    }
}
//解决中文不同的问题
global.md5Pay = function (str) {
    var str = (new Buffer(str)).toString("binary");
    return crypto.createHash('md5').update(str).digest(ciphertext);
}
//正常字符串加密
global.md5 = function (str) {
    return crypto.createHash('md5').update(str.toString()).digest(ciphertext);
}
//sha1加密
global.sha1 = function (str) {
    return crypto.createHash('sha1').update(str.toString()).digest(ciphertext);
}
/**
 * 时间戳转换为想要的时间格式
 */
//时间戳转换为时间 format('yyyy-MM-dd hh:mm:ss')
//时间格式转换
Date.prototype.format = function (fmt = 'yyyy-MM-dd hh:mm:ss') { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}