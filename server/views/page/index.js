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
            item.participators = yield* User.countParticipatorsByCid(item.cid);
            return item;
        })();
    });

    challenges = challenges.reduce(function(ret, item) {
        ret.I = ret.I || {};
        ret.M = ret.M || {};

        const date = item.end.toDateString();

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

    this.state.menu = 'moments';

    yield * this.render('moments');
};

exports.ranking = function*() {
    let merchants = yield* User.getAllMerchants();

    merchants = yield merchants.map(function(item) {
        return (function*() {
            item.participators = yield* User.countParticipatorsByMerchant(item.uid);
            return item;
        })();
    });
    merchants.sort(function(a, b) {
        return b.participators - a.participators;
    });

    const joins = yield* User.rankByJoined();

    let winners = yield* User.getAllIndividual();
    winners = yield winners.map(function(item) {
        return (function*() {
            item.victories = yield* Challenge.countVictories(item.uid);
            return item;
        })();
    });
    winners.sort(function(a, b) {
        return b.victories - a.victories;
    });

    this.state.merchants = merchants.slice(0, 10);
    this.state.winners = winners.slice(0, 10);
    this.state.joins = joins.slice(0, 10);
    this.state.menu = 'ranking';
    
    yield* this.render('ranking');
};