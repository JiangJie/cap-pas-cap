'use strong';

const User = require('../models/user');

exports.createUser = function*(next) {
    const uid = this.query.uid;
    const pwd = this.query.pwd;

    const user = {uid, pwd};

    this.body = yield* User.createUser(user);
};