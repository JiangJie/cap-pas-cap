'use strong';

/*
nodejs内部模块
*/
const path = require('path');

/*
npm第三方模块
*/
const co = require('co');
const koa = require('koa');
const staticServer = require('koa-static');
const render = require('koa-swig');
const logger = require('koa-logger');

/*
内部模块
*/
const CONFIG = require('./conf');
const debug = require('./lib/debug')(__filename);

const app = module.exports = koa();

// 这里应该捕获程序内部的error，不需要响应到client
app.on('error', function* onGlobalError(err, ctx) {
    debug.error('path %s cause error %s', ctx.path, err.message);
    debug.log(ctx);
});

// 静态文件处理
app.use(staticServer(path.resolve(__dirname, '../web/dist')));

// 注册模板渲染方法
app.context.render = render({
    root: path.resolve(__dirname, 'templates'),
    autoescape: true,
    cache: false, //'memory', // disable, set to false
    ext: 'html'
});

function* respond(err) {
    const accept = this.accepts('json', 'html');
    const json = accept === 'json';
    const html = accept === 'html';

    if(this.status >= 500) {
        if(json) return this.body = {
            message: err && err.message || 'Internal Server Error'
        };
        if(html) return yield* this.render('500');
    }

    if(this.status >= 400) {
        if(json) return this.body = {
            message: err && err.message || 'Not Found'
        };
        if(html) {
            if(this.status === 403) return this.body = {
                message: err && err.message || 'Forbidden'
            };
            if(this.status === 404) return yield* this.render('404');
            if(this.status === 406) return yield* this.render('406', {msg: err && err.message || 'Not Acceptable'});
        }
    }
}

// 这里应该捕获views里面throw出来的error，需要响应到client
app.use(function* firstHandler(next) {
    try {
        yield* next;

        // !important, 如果不对this.status进行赋值操作，后面会将status改成200
        this.status = this.status;

        yield* respond.call(this);
    } catch(err) {
        if(err) {
            debug.error('throw: %s', err.stack);
            this.app.emit('error', err, this);

            this.status = err.status || 500;
        }

        yield* respond.call(this, err);
    }
});

// logger
app.use(logger());

function* init() {
    debug.log('trying to connect database');
    yield * require('./conf/mongo').connect();
    debug.log('database connected');

    app.use(require('./views/common').setUser);

    const router = require('./conf/router');
    router.register(app);
}

co(init()).then(function() {
    debug.log('start co resolve');

    app.listen(CONFIG.PORT, function() {
        debug.log('koa application listen @ port %d @ %s', CONFIG.PORT, (new Date()).toLocaleString());
        debug.log('already registered middleware: %s', app.middleware.map(function(item) {
            return item.name;
        }));
    });
}, function(err) {
    debug.error('==========');
    debug.error('start co reject %s', err.stack);
    debug.error('==========');
    // process.exit(1);
}).catch(function(err) {
    debug.error('==========');
    debug.error('start co catch error %s', err.stack);
    debug.error('==========');
    // process.exit(1);
});