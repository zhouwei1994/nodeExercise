var {
    registerService,
    loginService,
    searchFriend,
    getUserInfoService,
    modifyUserInfo,
    addFriendService,
    agreeAddFriendService,
    addFriendListService
} = require('./../app/service/user');
var {
    upload
} = require('./../app/service/upload');
module.exports = function (router) {
    //注册
    router.post('/user/register', function (req, res) {
        var username = req.body.username;
        var nickname = req.body.nickname;
        var password = req.body.password;
        registerService(username, nickname, password).then(
            data => {
                res.send(data);
            }
        );
    });
    //登录
    router.post('/user/login', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        loginService(username, password).then(
            data => {
                if (data.code == 200) {
                    res.cookie('token', data.data, {
                        maxAge: 900000,
                        path: '/'
                    });
                }
                res.send(data);
            }
        );
    });
    //根据用户名搜索用户
    router.get('/searchFriend', function (req, res) {
        var username = req.query.username;
        searchFriend(username).then(data => {
            res.send(data);
        });
    });
    //根据用户ID搜索用户
    router.get('/set_user_info', function (req, res) {
        var id = req.query.id;
        getUserInfoService(id).then(data => {
            res.send(data);
        });
    });
    //上传图片到本地
    router.post('/upload_file', upload);
    //修改用户资料
    router.post('/modify_user_info', function (req, res) {
        var userId = req.body.userId;
        var headImg = req.body.headImg;
        var nickname = req.body.nickname;
        modifyUserInfo(userId, headImg, nickname).then(data => {
            res.send(data);
        });
    });
    //申请添加好友
    router.get('/add_friend', function (req, res) {
        var userId = req.query.userId;
        var acceptID = req.query.acceptID;
        var reason = req.query.reason;
        addFriendService(userId, acceptID, reason).then(data => {
            res.send(data);
        });
    });
    //同意|拒绝添加好友
    router.get('/agree_add_friend', function (req, res) {
        var userId = req.query.userId;
        var id = req.query.id;
        var state = req.query.state;
        agreeAddFriendService(userId, id, state).then(data => {
            res.send(data);
        });
    });
    //好友申请列表
    router.get('/add_friend_list', function (req, res) {
        var userId = req.query.userId;
        addFriendListService(userId).then(data => {
            res.send(data);
        });
    });
    // // /user 节点接受 PUT 请求
    // router.put('/user', function (req, res) {
    //     res.send('Got a PUT request at /user');
    // });

    // // /user 节点接受 DELETE 请求
    // router.delete('/user', function (req, res) {
    //     res.send('Got a DELETE request at /user');
    // });

    // //不管使用 GET、POST、PUT、DELETE 或其他任何 http 模块支持的 HTTP 请求，句柄都会得到执行
    // router.all('/secret', function (req, res, next) {
    //     console.log('Accessing the secret section ...');
    //     next(); // pass control to the next handler
    // });
}