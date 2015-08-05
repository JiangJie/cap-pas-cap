'use strong';

const User = require('../conf/mongo').collections.user;
const Challenge = require('./challenge');
const Util = require('../lib/util');

exports.create = function*(user) {
    user.pwd = Util.encryptPwd(user.pwd);
    
    return yield User.insert(user);
};

// 根据uid和pwd鉴权
exports.check = function*(uid, pwd) {
    if(!uid || !pwd) return false;

    return !!(yield User.findOne({uid: uid, pwd: pwd}));
};

exports.getInfo = function*(uid) {
    return yield User.findOne({uid: uid});
};

exports.addFavorite = function*(uid, cid) {
    return yield User.findOne({uid: uid}).addToSet({favorites: cid});
};

exports.hasFavorited = function*(uid, cid) {
    return !!(yield User.findOne({uid: uid, favorites: cid}));
};

exports.addJoin = function*(uid, cid, coins) {
    const cursor = User.findOne({uid: uid});

    const user = yield cursor;
    coins = Math.abs(coins);
    if(user.coins < coins) throw new Error('not enough c-coins');

    return yield cursor.addToSet({joins: cid}).inc({coins: -coins});
};

exports.hasJoined = function*(uid, cid) {
    return !!(yield User.findOne({uid: uid, joins: cid}));
};

exports.getJoinedCount = function*(cid) {
    return yield User.count({joins: cid});
};

exports.isMerchant = function*(uid) {
    return !!(yield User.findOne({uid: uid, type: 'M'}));
};

exports.getAll = function*() {
    return yield User.find();
};

exports.addFollower = function*(uid, follower) {
    yield User.findOne({uid: uid}).addToSet({followers: follower});
};

exports.addFollowing = function*(uid, following) {
    yield User.findOne({uid: uid}).addToSet({followings: following});
};

exports.countParticipatorsByCid = countParticipatorsByCid;
function* countParticipatorsByCid(cid) {
    return yield User.count({joins: cid});
}

exports.countParticipatorsByMerchant = function*(uid) {
    const challenges = yield* Challenge.getAllByCreator(uid);

    if(!challenges || !challenges.length) return 0;

    const count = yield challenges.map(function(item) {
        return (function*() {
            return yield* countParticipatorsByCid(item.cid);
        })();
    });

    return count.reduce(function(ret, item) {
        return ret + item;
    }, 0);
};

exports.getNickname = function*(uid) {
    const user = yield User.findOne({uid: uid});
    return user && user.nickname || uid;
};

exports.getAllMerchants = function*() {
    return yield User.find({type: 'M'});
};

exports.rankByJoined = function*() {
    return yield User.aggregate()
        .match({
            type: {$not: /^M$/},
            joins: {$exists: true}
        })
        .project({
            uid: 1,
            nickname: 1,
            logo: 1,
            joinCount: {
                $size: '$joins'
            }
        })
        .sort({
            joinCount: -1
        })
        .limit(10);
};

exports.getAllIndividual = function*() {
    return yield User.find({type: {$not: /^M$/}});
};