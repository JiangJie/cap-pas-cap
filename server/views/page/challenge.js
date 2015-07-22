'use strong';

const Challenge = require('../../models/challenge');

exports.detail = function*() {
    const cid = this.params.cid;

    const chall = yield* Challenge.findByCid(cid);

    chall.difficulty = new Array(chall.difficulty || 1);

    this.state.challenge = chall;

    yield* this.render('detail');
};