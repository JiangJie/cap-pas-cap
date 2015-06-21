'use strong';

module.exports = {
    MONGO: {
        url: `mongodb://127.0.0.1:27017/cappascap`,
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