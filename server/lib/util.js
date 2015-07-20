'use strong';

const crypto = require('crypto');

const CIPHER = 'aes256';
const TOKEN_KEY = 'cap pas cap';

exports.encryptPwd = function(pwd) {
    return crypto.createHash('md5').update(pwd).digest('hex');
};

exports.getDateString = function(d) {
    d = d || new Date();

    (d instanceof Date) || (d = new Date(d));

    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}

// 获取比当前时间晚一天的时间，主要用在cookie
exports.getNextDay = function() {
    let t = Date.now();
    t += 3600 * 24 * 1000;
    return new Date(t);
};
exports.getLastDay = function() {
    let t = Date.now();
    t -= 3600 * 24 * 1000;
    return new Date(t);
};

// uid直接保存到user表
// pwd经过md5保存到user表
// 用加密后的pwd加密uid得到key保存到session表
// 将uid|key经过加密因子加密得到token，种入cookie，同时传给第三方

// 加密串str
function encryptStr(str, key) {
    const cipher = crypto.createCipher(CIPHER, key);
    return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
}
// 解密串str
function decryptStr(str, key) {
    const decipher = crypto.createDecipher(CIPHER, key);
    return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
}

// MD5
function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}
exports.md5 = md5;

// 用MD5加密原始密码
exports.encodePwd = md5;

// 用加密后的pwd加密uid得到key
exports.encodeKey = encryptStr;

// 将uid|key经过加密因子加密得到token
exports.encodeToken = function(uid, key) {
    const str = uid + '|' + key;
    return encryptStr(str, TOKEN_KEY);
};

// 将加密后的token加密出uid|key
exports.decodeToken = function(token) {
    if(!token) return null;
    
    try {
        token = decryptStr(token, TOKEN_KEY);
        return token.split('|');
    } catch(e) {
        return null;
    }
};