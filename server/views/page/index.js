'use strong';

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

exports.moment = function*() {
    yield * this.render('moment');
};