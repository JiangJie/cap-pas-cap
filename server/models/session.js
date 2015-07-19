'use strong';

const Session = require('../conf/mongo').session;

exports.upsert = function*(session) {
    if(!session.key) return;

    return yield Session.findOne({key: session.key}).upsert(session);
};

exports.removeByKey = function*(key) {
    yield Session.remove({key: key});
};

exports.check = function*(key) {
    if(!key) return false;

    return !!(yield Session.findOne({key: key}));
};