'use strong';

const CONFIG = require('../conf');
const ERROR = require('../conf/error');

function* hasErrors(next) {
    if (!this.errors) return yield * next;

    Array.isArray(this.errors) || (this.errors = [this.errors]);
    const message = this.errors.map(function(item) {
        return typeof item === 'object' ? item[Object.keys(item)[0]] : item;
    }).join(' AND ');

    this.throw(new ERROR.NotAcceptableError(message));
}

exports.checkUser = function*(next) {
    this.checkQuery('uid').notEmpty();
    this.checkQuery('pwd').notEmpty();

    yield * hasErrors.call(this, next);
};

exports.checkSignUser = function*(next) {
    this.checkBody('uid').notEmpty('email is required').match(/\w+@\w+/, 'email must contain @');
    this.checkBody('pwd').notEmpty('password is required');

    yield * hasErrors.call(this, next);
};

exports.checkLogin = function*(next) {
    const whiteList = ['/page/signup', '/page/signin', '/api/signup', '/api/signin'];

    const path = this.path;
    if(~whiteList.indexOf(path) || this.state.user) return yield* next;

    this.cookies.set(CONFIG.TOKEN, null, {signed: false, domain: CONFIG.DOMAIN, expires: new Date(0), path: '/', httpOnly: false});
    this.throw(new ERROR.ForbiddenError('no login'));
};

exports.checkAuth = function*(next) {
};

exports.checkChallenge = function*(next) {
    this.checkBody('name').notEmpty('name is required');
    this.checkBody('start').notEmpty('start time is required').isDate('start time mush be a date');
    this.checkBody('end').notEmpty('end time is required').isDate('end time mush be a date');
    this.checkBody('location').notEmpty('location is required');
    this.checkBody('fee').notEmpty('fee is required').isInt('fee mush be an integer');
    this.checkBody('max').notEmpty('max participators is required').toInt('max participators mush be an integer').le(100, 'max participators great than 100');
    this.checkBody('difficulty').notEmpty('difficulty is required').isInt('difficulty mush be an integer');
    this.checkBody('desc').notEmpty('description is required');

    yield * hasErrors.call(this, next);
};