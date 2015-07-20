'use strong';

const Chall = require('../../models/challenge');
const Util = require('../../lib/util');

const ERROR = require('../../conf/error');

exports.publish = function*(next) {
    const user = this.state.user;

    const params = this.request.body;

    const name = params.name;
    const dealline = params.dealline && new Date(params.dealline);
    const start = new Date(params.start);
    const end = new Date(params.end);
    const location = params.location;
    const fee = Number(params.fee);
    const max = Number(params.max);
    const desc = params.desc;
    const difficulty = Number(params.difficulty);

    const chall = {name, start, end, location, fee, max, desc};

    dealline && (chall.dealline = dealline);
    difficulty && (chall.difficulty = difficulty);

    this.state.extra = {
        result: yield* Chall.create(chall)
    };

    yield* next;
};