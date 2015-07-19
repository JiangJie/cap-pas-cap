'use strong';

const User = require('../models/user');
const Util = require('../lib/util');

const ERROR = require('../conf/error');

exports.signup = function*(next) {
    const params = this.request.body;

    const uid = params.uid;
    const pwd = params.pwd;
    const nickname = params.nickname;
    const gender = params.gender;

    const user = {uid, pwd};
    nickname && (user.nickname = nickname);
    gender && (user.gender = gender);

    yield* User.createUser(user);

    yield* next;
};

exports.signin = function*(next) {
    // debugger;
    const params = this.request.body;

    const uid = params.uid;
    const pwd = Util.encodePwd(params.pwd);

    const success = yield* User.check(uid, pwd);
    if(!success) this.throw(new ERROR.ForbiddenError('uin or pwd error'));

    this.state.user = {uid, pwd};

    yield* next;
};