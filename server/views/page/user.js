'use strong';

const User = require('../../models/user');

const ERROR = require('../../conf/error');

exports.home = function*() {
    const me = this.state.user && this.state.user.uid;
    let uid = this.params.uid;

    uid = uid || me;
    if(!uid) this.throw(new ERROR.NotAcceptableError('need user'));

    this.state.mine = me === uid;
    const info = this.state.ta = yield* User.getInfo(uid);

    // 商家
    if(true || info.type === 'M') return yield* this.render('merchant');

    yield* this.render('home');
};