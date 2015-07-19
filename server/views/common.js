'use strong';

const Session = require('../models/session');
const Util = require('../lib/util');
const Config = require('../conf');

// 后台返回成功的统一函数
exports.success = function*() {
    // debugger;
    const extra = this.state.extra;
    let res = {};

    if(typeof extra === 'object') res = extra;
    // flag
    else if(typeof extra === 'string') res[extra] = 1;

    res.status = 0;
    res.success = 1;
    res.message = 'OK';

    if(this.accepts('json', 'html') === 'json') return this.body = res;

    if(extra && extra.redirect) return this.redirect(extra.redirect);

    this.body = res;
}

// 已登录，种cookie，更新session
exports.logined = function*(next) {
    const user = this.state.user;

    const uid = user.uid;

    if(!uid) return yield* next;

    const key = Util.encodeKey(uid, user.pwd);

    // session
    const session = {
        ip: this.ip,
        ts: Date.now(),
        key: key
    };
    // 写session
    yield* Session.upsert(session);

    // 写cookie
    const token = Util.encodeToken(uid, key);
    this.cookies.set(Config.TOKEN, token, {signed: false, domain: 'airj.me', expires: Util.getNextDay()});

    yield* next;
};