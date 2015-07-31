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

exports.addFavorite = function*(uid, cid) {
    return yield User.findOne({uid: uid}).addToSet({favorites: cid});
};

exports.hasFavorited = function*(uid, cid) {
    return !!(yield User.findOne({uid: uid, favorites: cid}));
};

exports.addJoin = function*(uid, cid) {
    return yield User.findOne({uid: uid}).addToSet({joins: cid});
};

exports.getJoinedCount = function*(cid) {
    return yield User.count({joins: cid});
};