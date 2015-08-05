'use strong';

const gm = require('gm');
const Promise = require('bluebird');

const Challenge = require('../../models/challenge');
const Feed = require('../../models/feed');
const Util = require('../../lib/util');

const ERROR = require('../../conf/error');

exports.publish = function*(next) {
    const user = this.state.user;
    const creator = user.uid;

    const params = this.request.body;

    const name = params.name;
    const type = params.type;
    const start = new Date(params.start);
    const end = new Date(params.end);
    const deadline = params.deadline && new Date(params.deadline) || end;
    const location = params.location;
    const fee = Number(params.fee);
    const max = Number(params.max);
    const desc = params.desc;
    const difficulty = Number(params.difficulty);
    // const launch = params.launch;
    const imgs = params.imgs;

    let chall = {creator, name, type, start, end, location, fee, max, desc};

    deadline && (chall.deadline = deadline);
    difficulty && (chall.difficulty = difficulty);
    // launch && (chall.launch = launch);

    if(imgs) {
        chall.imgs = yield imgs.map(function(img) {
            return (function*() {
                let prefix = 'data:image/jpeg;base64,';
                img = img.replace(/^data:image\/[^;]+;base64,/, function(pre) {
                    prefix = pre;
                    return '';
                });
                img = new Buffer(img, 'base64');
                const gmer = gm(img).resize(500);
                const buffer = yield Promise.promisify(gmer.toBuffer).call(gmer);
                return prefix + buffer.toString('base64');
            })();
        });
    }

    chall.create = new Date();

    chall = yield* Challenge.create(chall);
    this.state.extra = {
        result: chall
    };

    yield* Feed.publishChallenge(creator, chall.cid);

    yield* next;
};

exports.review = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;
    const params = this.request.body;

    const review = {
        creator: uid,
        create: new Date(),
        desc: params.desc
    };
    const imgs = params.imgs; 

    if(imgs) {
        review.imgs = yield imgs.map(function(img) {
            return (function*() {
                let prefix = 'data:image/jpeg;base64,';
                img = img.replace(/^data:image\/[^;]+;base64,/, function(pre) {
                    prefix = pre;
                    return '';
                });
                img = new Buffer(img, 'base64');
                const gmer = gm(img).resize(500);
                const buffer = yield Promise.promisify(gmer.toBuffer).call(gmer);
                return prefix + buffer.toString('base64');
            })();
        });
    }

    yield* Challenge.addReview(cid, review);
    yield* Feed.addReview(uid, cid);

    this.state.extra = {
        result: {
            cid: cid
        }
    };

    yield* next;
};

exports.moment = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;
    const params = this.request.body;

    const moment = {
        creator: uid,
        create: new Date(),
        winner: params.winner,
        desc: params.desc
    };
    if(!moment.winner || !moment.desc) this.throw(ERROR.NotAcceptableError('missing params.'));

    const imgs = params.imgs; 

    if(imgs) {
        moment.imgs = yield imgs.map(function(img) {
            return (function*() {
                let prefix = 'data:image/jpeg;base64,';
                img = img.replace(/^data:image\/[^;]+;base64,/, function(pre) {
                    prefix = pre;
                    return '';
                });
                img = new Buffer(img, 'base64');
                const gmer = gm(img).resize(500);
                const buffer = yield Promise.promisify(gmer.toBuffer).call(gmer);
                return prefix + buffer.toString('base64');
            })();
        });
    }

    yield* Challenge.addMoment(cid, moment);
    // yield* Feed.addMoment(uid, cid);

    this.state.extra = {
        result: {
            cid: cid
        }
    };

    yield* next;
};

exports.comment = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;
    const rid = this.params.rid;

    const desc = this.request.body.desc;

    const comment = {desc};
    comment.creator = uid;
    comment.create = new Date();

    yield* Challenge.addComment(cid, rid, comment);
    yield* Feed.addComment(uid, cid);

    yield* next;
};

exports.star = function*(next) {
    const uid = this.state.user.uid;
    const cid = this.params.cid;
    const rid = this.params.rid;

    yield* Challenge.addStar(uid, cid, rid);

    yield* next;
};