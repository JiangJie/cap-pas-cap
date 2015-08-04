'use strong';

const User = require('../../models/user');
const Challenge = require('../../models/challenge');

const ERROR = require('../../conf/error');

exports.detail = function*() {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);

    if(!chall) this.throw(new ERROR.NotFoundError());

    this.state.mine = uid === chall.creator;

    chall.difficulty = new Array(chall.difficulty || 1);
    chall.isOver = chall.end <= new Date();

    chall.hasFavorited = yield* User.hasFavorited(uid, cid);
    chall.hasJoined = yield* User.hasJoined(uid, cid);
    chall.joinedCount = yield* User.getJoinedCount(cid);

    let users = yield* User.getAll();

    users = users.reduce(function(ret, item) {
        uid === item.uid && (this.state.user.type = item.type);
        ret[item.uid] = item;
        return ret;
    }.bind(this), {});

    chall.creator = users[chall.creator];

    chall.reviews = chall.reviews || [];
    chall.reviews.forEach(function(item) {
        item.creator = users[item.creator];
    });

    chall.moments && (chall.moments[0].winner = users[chall.moments[0].winner].nickname || chall.moments[0].winner);

    this.state.challenge = chall;
    this.state.tab = this.query.tab || 'detail';

    yield* this.render('detail');
};

exports.ranking = function*() {
    yield* this.render('ranking');
};

exports.review = function*() {
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);
    this.state.challenge = chall;
    
    yield* this.render('review');
};

exports.moment = function*() {
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);
    this.state.challenge = chall;
    
    yield* this.render('moment');
};

exports.comment = function*() {
    const cid = this.params.cid;
    const rid = this.params.rid;

    const chall = yield* Challenge.findByCid(cid);

    this.state.cid = cid;
    this.state.rid = rid;
    const comments = chall.reviews && chall.reviews[rid] && chall.reviews[rid].comments || [];

    let users = yield* User.getAll();

    users = users.reduce(function(ret, item) {
        ret[item.uid] = item;
        return ret;
    }, {});

    comments.forEach(function(item) {
        item.creator = users[item.creator];
    });

    this.state.comments = comments;

    yield* this.render('comment');
};

exports.search = function*() {
    const q = (this.query.q || '').trim();

    q && (this.state.challenges = yield* Challenge.queryByName(q));

    this.state.type = 'sport';
    yield* this.render('result');
};

exports.order = function*() {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);

    chall.hasJoined = yield* User.hasJoined(uid, cid);

    this.state.challenge = chall;

    yield * this.render('order');
};