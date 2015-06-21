'use strong';

const crypto = require('crypto');

exports.encryptPwd = function(pwd) {
    return crypto.createHash('md5').update(pwd).digest('hex');
};