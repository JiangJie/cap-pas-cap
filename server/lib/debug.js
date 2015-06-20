'use strict';

const path = require('path');
const debug = require('debug');

const root = path.resolve(__dirname, '..');

module.exports = function(filename) {
    filename = filename || '';

    let name = path.relative(root, filename);

    name = name.split('.');
    name.pop();
    name = name.join('.').split(path.sep).join(':');

    const res = {
        log: debug(`app:${name}:log`),
        error: debug(`app:${name}:error`)
    };

    res.error.log = console.error.bind(console);

    return res;
};