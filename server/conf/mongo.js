'use strong';

/*
npm模块
*/
const Promise = require('bluebird');
const mongodb = require('mongodb');
const collection = require('mongodb-next').collection;

/*
内部模块
*/
const config = require('./').MONGO;
const debug = require('../lib/debug')(__filename);

const connect = Promise.promisify(mongodb.MongoClient.connect).bind(mongodb.MongoClient);

const db = module.exports = {};

db.connect = function*() {
    const _db =
        yield connect(config.url);

    db._db = _db;

    ['user', 'session'].forEach(function(item) {
        let _item = _db.collection(item);
        _item = collection(_item);
        db[item] = _item;
    });
};

process.on('exit', function() {
    debug.log('==========process is exiting, try to close db==========');
    db._db && db._db.close && db._db.close();
    debug.log('==========close db success==========');
});