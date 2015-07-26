'use strong';

const Challenge = require('../../models/challenge');
const Util = require('../../lib/util');

const ERROR = require('../../conf/error');

exports.publish = function*(next) {
    const user = this.state.user;
    const uid = user.uid;

    const params = this.request.body;

    const name = params.name;
    const deadline = params.deadline && new Date(params.deadline);
    const start = new Date(params.start);
    const end = new Date(params.end);
    const location = params.location;
    const fee = Number(params.fee);
    const max = Number(params.max);
    const desc = params.desc;
    const difficulty = Number(params.difficulty);
    const launch = params.launch;

    const chall = {uid, name, start, end, location, fee, max, desc};

    deadline && (chall.deadline = deadline);
    difficulty && (chall.difficulty = difficulty);
    launch && (chall.launch = launch);

    chall.create = new Date();

    this.state.extra = {
        result: yield* Challenge.create(chall)
    };

    yield* next;
};