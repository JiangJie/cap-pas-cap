'use strong';

exports.publish = function*(next) {
    yield * this.render('publish');
};

exports.search = function*(next) {
    yield * this.render('search');
};