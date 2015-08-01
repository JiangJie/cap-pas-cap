'use strong';

const gm = require('gm');
const Promise = require('bluebird');

const Challenge = require('../../models/challenge');
const Util = require('../../lib/util');

const ERROR = require('../../conf/error');

exports.publish = function*(next) {
    const user = this.state.user;
    const creator = user.uid;

    const params = this.request.body;

    const name = params.name;
    const start = new Date(params.start);
    const end = new Date(params.end);
    const deadline = params.deadline && new Date(params.deadline) || end;
    const location = params.location;
    const fee = Number(params.fee);
    const max = Number(params.max);
    const desc = params.desc;
    const difficulty = Number(params.difficulty);
    const launch = params.launch;
    const imgs = params.imgs;

    const chall = {creator, name, start, end, location, fee, max, desc};

    deadline && (chall.deadline = deadline);
    difficulty && (chall.difficulty = difficulty);
    launch && (chall.launch = launch);

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

    this.state.extra = {
        result: yield* Challenge.create(chall)
    };

    yield* next;
};