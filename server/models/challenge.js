'use strong';

const Challenge = require('../conf/mongo').collections.challenge;

const debug = require('../lib/debug')(__filename);

function* genCid() {
    const MIN = Math.pow(36, 5);
    const MAX = Math.pow(36, 6);

    let cid = Math.round(Math.random() * (MAX - MIN)) + MIN;
    cid = cid.toString(36);
    const chall = yield * exports.findByCid(cid);

    // 已经存在了，重新生成
    if (chall) {
        debug.log('cid %s is repetitive, regenerating', cid);
        return yield * genCid();
    }

    return cid;
}

exports.getAll = function*() {
    return yield Challenge.find().sort({create: -1});
};

exports.findByCid = function*(cid) {
    return yield Challenge.findOne({cid: cid});
};

exports.create = function*(chall) {
    chall.cid = yield* genCid();
    return yield Challenge.insert(chall);
};

exports.groupByLaunch = function*() {
    const dataset = yield Challenge.aggregate()
        .match({
            launch: {
                $exists: true
            }
        })
        .sort({
            create: -1
        })
        .group({
            _id: '$launch',
            challenges: {
                $push: {
                    cid: '$cid',
                    name: '$name',
                    fee: '$fee',
                    location: '$location',
                    imgs: '$imgs'
                }
            }
        });

    return dataset.reduce(function(ret, item) {
        ret[item._id] = item.challenges;
        return ret;
    }, {});
};

exports.queryByName = function*(q) {
    q = new RegExp(q, 'ig');
    return yield Challenge.find({name: q});
};

exports.addReview = function*(cid, review) {
    yield Challenge.findOne({cid: cid}).addToSet({reviews: review});
};