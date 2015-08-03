'use strong';

const User = require('../../models/user');
const Challenge = require('../../models/challenge');
const Feed = require('../../models/feed');

const ERROR = require('../../conf/error');

exports.favorite = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    yield* User.addFavorite(uid, cid);
    yield* Feed.favoriteChallenge(uid, cid);

    yield* next;
};

exports.join = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;

    const num = Number(this.request.body.num);

    if(!num || isNaN(num)) this.throw(new ERROR.NotAcceptableError('wrong amount'));

    const chall = yield* Challenge.findByCid(cid);

    if(!chall) this.throw(new ERROR.NotAcceptableError('wrong challenge'));

    const coins = Number(chall.fee) * 0.95 * num;

    yield* User.addJoin(uid, cid, coins);
    yield* Feed.joinChallenge(uid, cid);

    yield* next;
};

exports.follow = function*(next) {
    const uid = this.state.user.uid;
    const ta = this.params.uid;

    if(uid === ta) return yield* next;

    yield* User.addFollower(ta, uid);
    yield* User.addFollowing(uid, ta);
    yield* Feed.followIndividual(uid, ta);

    yield* next;
};