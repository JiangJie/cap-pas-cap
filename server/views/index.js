'use strong';

exports.index = function*(next) {
    yield * this.render('index');
};

exports.signin = function*(next) {
    yield * this.render('signin');
};