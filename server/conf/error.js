'use strong';

const http = require('http');

const error = module.exports = {};

function UnauthorizedError(message, data) {
    this.name = 'UnauthorizedError';
    this.status = 401;
    this.message = message || http.STATUS_CODES[this.status];
    this.data = data || null;
    this.stack = (new Error()).stack;
}
UnauthorizedError.prototype = new Error();
UnauthorizedError.prototype.constructor = UnauthorizedError;

error.UnauthorizedError = UnauthorizedError;

function ForbiddenError(message, data) {
    this.name = 'ForbiddenError';
    this.status = 403;
    this.message = message || http.STATUS_CODES[this.status];
    this.data = data || null;
    this.stack = (new Error()).stack;
}
ForbiddenError.prototype = new Error();
ForbiddenError.prototype.constructor = ForbiddenError;

error.ForbiddenError = ForbiddenError;

function NotFoundError(message, data) {
    this.name = 'NotFoundError';
    this.status = 404;
    this.message = message || http.STATUS_CODES[this.status];
    this.data = data || null;
    this.stack = (new Error()).stack;
}
NotFoundError.prototype = new Error();
NotFoundError.prototype.constructor = NotFoundError;

error.NotFoundError = NotFoundError;

function NotAcceptableError(retcode, message, data) {
    this.name = 'NotAcceptableError';
    this.status = 406;
    this.stack = (new Error()).stack;

    if (typeof retcode === 'number') {
        this.retcode = retcode;
        this.message = message || http.STATUS_CODES[this.status];
        this.data = data || null;
    } else {
        this.message = retcode || http.STATUS_CODES[this.status];
        this.data = message || null;
    }
}
NotAcceptableError.prototype = new Error();
NotAcceptableError.prototype.constructor = NotAcceptableError;

error.NotAcceptableError = NotAcceptableError;