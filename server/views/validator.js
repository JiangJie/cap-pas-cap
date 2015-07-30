'use strong';

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
    this.checkBody('uid').notEmpty();
    this.checkBody('pwd').notEmpty();

    yield * hasErrors.call(this, next);
};

exports.checkLogin = function*(next) {
    const whiteList = ['/page/signup', '/page/signin', '/api/signup', '/api/signin'];

    const path = this.path;
    if(~whiteList.indexOf(path) || this.state.user) return yield* next;

    this.throw(new ERROR.ForbiddenError('no login'));
};

exports.checkAuth = function*(next) {
};