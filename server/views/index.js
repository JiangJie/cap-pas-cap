'use strong';

exports.index = function*(next) {
    yield * this.render('index');
};