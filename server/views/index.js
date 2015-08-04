'use strong';

const User = require('../models/user');
const Challenge = require('../models/challenge');

exports.index = function*(next) {
    let challenges = yield* Challenge.getAllActive();
    let users = yield* User.getAll();

    users = users.reduce(function(ret, item) {
        ret[item.uid] = item;
        return ret;
    }, {});

    challenges = challenges.reduce(function(ret, item) {
        ret.I = ret.I || [];
        ret.M = ret.M || [];

        if(users[item.creator] && users[item.creator].type === 'M') ret.M.push(item);
        else ret.I.push(item);

        return ret;
    }, {});
    this.state.lists = challenges;

    yield * this.render('index');
};