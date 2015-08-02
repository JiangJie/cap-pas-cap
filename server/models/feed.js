'use strong';

const Feed = require('../conf/mongo').collections.feed;

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