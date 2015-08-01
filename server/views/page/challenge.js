'use strong';

const User = require('../../models/user');
const Challenge = require('../../models/challenge');

exports.detail = function*() {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);

    chall.difficulty = new Array(chall.difficulty || 1);
    chall.isOver = chall.deadline <= new Date();

    chall.hasFavorited = yield* User.hasFavorited(uid, cid);
    chall.hasJoined = yield* User.hasJoined(uid, cid);
    chall.joinedCount = yield* User.getJoinedCount(cid);

    this.state.challenge = chall;

    yield* this.render('detail');
};

exports.ranking = function*() {
    yield* this.render('ranking');
};

exports.review = function*() {
    yield* this.render('review');
};

exports.comment = function*() {
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