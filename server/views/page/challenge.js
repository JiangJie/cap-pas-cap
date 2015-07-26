'use strong';

const Challenge = require('../../models/challenge');

exports.detail = function*() {
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);

    chall.difficulty = new Array(chall.difficulty || 1);
    chall.isOver = chall.deadline <= new Date();

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
    this.state.type = 'sport';
    yield* this.render('result');
};