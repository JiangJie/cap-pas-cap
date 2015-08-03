'use strong';

const User = require('../../models/user');
const Feed = require('../../models/feed');

const ERROR = require('../../conf/error');

exports.home = function*() {
    const uid = this.state.user && this.state.user.uid;
    let ta = this.params.uid;

    ta = ta || uid;
    if(!ta) this.throw(new ERROR.NotAcceptableError('invalide user'));

    this.state.mine = uid === ta;
    const info = yield* User.getInfo(ta);
    if(!info) this.throw(new ERROR.NotAcceptableError('invalide user'));

    this.state.ta = info;

    this.state.followed = info.followers && ~info.followers.indexOf(uid);

    // 商家
    if(info.type === 'M') return yield* this.render('merchant');

    this.state.feeds = yield* Feed.getMyAllFeeds(uid);

    yield* this.render('home');
};

exports.setting = function*() {
    yield* this.render('setting');
};