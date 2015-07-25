'use strong';

const User = require('../../models/user');

const ERROR = require('../../conf/error');

exports.home = function*() {
    const me = this.state.user && this.state.user.uid;
    let uid = this.params.uid;

    uid = uid || me;
    if(!uid) this.throw(new ERROR.NotAcceptableError('need user'));

    this.state.mine = me === uid;
    this.state.ta = yield* User.getInfo(uid);

    yield* this.render('home');
};