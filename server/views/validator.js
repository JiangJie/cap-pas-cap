'use strong';

const ERROR = require('../conf/error');

function* hasErrors(next) {
    if (!this.errors) return yield * next;

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