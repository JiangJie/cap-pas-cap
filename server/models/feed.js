'use strong';

const Feed = require('../conf/mongo').collections.feed;
const User = require('./user');
const Challenge = require('./challenge');

/*
type
1: edit info
    fields: []
2: follow other
3: follow merchant
4: publish challenge
5: favorite challenge
6: join challenge
7: add review for challenge
8: add comment for challenge's review
    rid: 0
*/
const map = {
    1: 'edit',
    2: 'follow',
    3: 'follow',
    4: 'publish',
    5: 'favorite',
    6: 'join',
    7: 'review',
    8: 'comment'
};

exports.create = function*(feed) {
    yield Feed.insert(feed);
};

exports.favoriteChallenge = function*(uid, cid) {
    const feed = {uid, cid};
    feed.create = new Date();
    feed.type = 5;

    yield Feed.insert(feed);
};

exports.joinChallenge = function*(uid, cid) {
    const feed = {uid, cid};
    feed.create = new Date();
    feed.type = 6;

    yield Feed.insert(feed);
};

exports.publishChallenge = function*(uid, cid) {
    const feed = {uid, cid};
    feed.create = new Date();
    feed.type = 4;

    yield Feed.insert(feed);
};

exports.followIndividual = function*(uid, ta) {
    const feed = {uid, ta};
    feed.create = new Date();
    feed.type = 2;

    yield Feed.insert(feed);
};

exports.addReview = function*(uid, cid) {
    const feed = {uid, cid};
    feed.create = new Date();
    feed.type = 7;

    yield Feed.insert(feed);
};

exports.addComment = function*(uid, cid) {
    const feed = {uid, cid};
    feed.create = new Date();
    feed.type = 8;

    yield Feed.insert(feed);
};

exports.getMyAllFeeds = function*(uid) {
    const feeds = yield Feed.find({uid: uid}).sort({create: -1});
    return yield feeds.map(function(item) {
        return (function*() {
            item.type = map[item.type];
            
            if(item.cid) item.name = yield* Challenge.getNameByCid(item.cid);
            else if(item.ta) item.name = yield* User.getNickname(item.ta);

            return item;
        })();
    });
};