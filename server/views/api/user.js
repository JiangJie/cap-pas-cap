'use strong';

const User = require('../../models/user');

exports.favorite = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    yield* User.addFavorite(uid, cid);

    yield* next;
};

exports.join = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    yield* User.addJoin(uid, cid);

    yield* next;
};