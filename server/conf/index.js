'use strict';

module.exports = {
    MONGO: {
        url: `mongodb://127.0.0.1:20107/cappascap`,
        // user: 'alloyteam',
        // pass: '@alloy123',
        options: {
            server: {
                poolSize: 10,
                autoReconnect: true
            }
        }
    },
    // cookie名字
    TOKEN: 'SID',
    PORT: 20000
};