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

    this.state.menu = 'profile';

    // 商家
    if(info.type === 'M') return yield* this.render('merchant');

    let feeds = yield* Feed.getMyAllFeeds(uid);
    feeds = feeds.reduce(function(ret, item) {
        const date = item.create.getDate();
        const time = 1e8 - parseInt('' + item.create.getFullYear() + item.create.getMonth() + date);
        item.date = date;
        
        ret[time] = ret[time] || [];

        ret[time].push(item);

        return ret;
    }, {});
    console.log(feeds);
    this.state.feedsList = feeds;

    yield* this.render('home');
};

exports.setting = function*() {
    yield* this.render('setting');
};