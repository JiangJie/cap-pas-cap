'use strong';

const gm = require('gm');
const Promise = require('bluebird');

const User = require('../../models/user');
const Util = require('../../lib/util');

const ERROR = require('../../conf/error');

exports.signup = function*(next) {
    const params = this.request.body;

    let logo = params.logo;

    if(logo) {
        let prefix = 'data:image/jpeg;base64,';
        logo = logo.replace(/^data:image\/[^;]+;base64,/, function(pre) {
            prefix = pre;
            return '';
        });
        logo = new Buffer(logo, 'base64');
        const gmer = gm(logo).resize(200);
        const buffer = yield Promise.promisify(gmer.toBuffer).call(gmer);
        params.logo = prefix + buffer.toString('base64');
    }

    if(params.type === 'M') {
        yield* User.create(params);

        return yield* next;
    }

    const uid = params.uid;
    const pwd = params.pwd;
    const nickname = params.nickname;
    const gender = params.gender;

    const user = {uid, pwd};
    nickname && (user.nickname = nickname);
    gender && (user.gender = gender);
    logo && (user.logo = params.logo);

    user.coins = 2000;

    yield* User.create(user);

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