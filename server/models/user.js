'use strong';

const User = require('../conf/mongo').user;
const Util = require('../lib/util');

exports.createUser = function*(user) {
    user.pwd = Util.encryptPwd(user.pwd);
    
    return yield User.insert(user);
};