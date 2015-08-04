'use strong';

const User = require('../../models/user');
const Challenge = require('../../models/challenge');

exports.signup = function*(next) {
    yield * this.render('signup');
};

exports.signin = function*(next) {
    yield * this.render('signin');
};

exports.publish = function*(next) {
    yield * this.render('publish');
};

exports.search = function*(next) {
    yield * this.render('search');
};

exports.moments = function*() {
    let challenges = yield* Challenge.getAllExpired();
    let users = yield* User.getAll();

    users = users.reduce(function(ret, item) {
        ret[item.uid] = item;
        return ret;
    }, {});

    challenges = yield challenges.map(function(item) {
        return (function*() {
            item.difficulty = new Array(item.difficulty || 1);
            item.participants = yield* User.getParticipantsCount(item.cid);
            return item;
        })();
    });

    challenges = challenges.reduce(function(ret, item) {
        ret.I = ret.I || {};
        ret.M = ret.M || {};

        const date = item.create.toDateString();

        if(users[item.creator] && users[item.creator].type === 'M') {
            ret.M[date] = ret.M[date] || [];
            ret.M[date].push(item);
        } else {
            ret.I[date] = ret.I[date] || [];
            ret.I[date].push(item);
        }

        return ret;
    }, {});

    this.state.lists = challenges;

    yield * this.render('moments');
};