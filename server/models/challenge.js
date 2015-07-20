'use strong';

const Challenge = require('../conf/mongo').collections.challenge;

exports.create = function*(chall) {
    return yield Challenge.insert(chall);
};