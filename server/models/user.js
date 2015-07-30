'use strong';

const User = require('../conf/mongo').collections.user;
const Util = require('../lib/util');

exports.create = function*(user) {
    user.pwd = Util.encryptPwd(user.pwd);
    
    return yield User.insert(user);
};

// 根据uid和pwd鉴权
exports.check = function*(uid, pwd) {
    if(!uid || !pwd) return false;

    return !!(yield User.findOne({uid: uid, pwd: pwd}));
};

exports.getInfo = function*(uid) {
    return yield User.findOne({uid: uid}).fields({
        nickname: 1,
        gender: 1,
        logo: 1
    });
};