'use strong';

const Challenge = require('../models/challenge');

exports.index = function*(next) {
    this.state.lists = yield* Challenge.groupByLaunch();

    yield * this.render('index');
};