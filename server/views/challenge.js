'use strong';

exports.publish = function*(next) {
    yield * this.render('publish');
};