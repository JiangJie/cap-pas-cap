'use strong';

/*
npm模块
*/
const Router = require('koa-router');
const mount = require('koa-mount');
const bodyParser = require('koa-bodyparser');
const validate = require('koa-validate');

/*
内部模块
*/
const Views = require('../views');
const Admin = require('../views/admin');
const Page = require('../views/page');
const Api = require('../views/api');
const challengeApi = require('../views/api/challenge');
const challengePage = require('../views/page/challenge');
const userPage = require('../views/page/user');
const Validator = require('../views/validator');
const Common = require('../views/common');

const ROOT = new Router();
const PAGE = new Router();
const API = new Router();
const ADMIN = new Router();

ADMIN.get('/create_user', validate(), Validator.checkUser, Admin.createUser);

ROOT.get('show index page', '/', Views.index);

PAGE.get('show signup page', '/signup', Page.signup);
PAGE.get('show signin page', '/signin', Page.signin);
PAGE.get('show publish challenge page', '/publish', Page.publish);
PAGE.get('show search challenge page', '/search', Page.search);
PAGE.get('show moment page', '/moment', Page.moment);
PAGE.get('show challenge detail page', '/challenge/:cid', challengePage.detail);
PAGE.get('show publish challenge review page', '/challenge/:cid/review/publish', challengePage.review);
PAGE.get('show challenge review\'s comments page', '/challenge/:cid/review/:rid', challengePage.comment);
PAGE.get('show ranking list page', '/ranking', challengePage.ranking);
PAGE.get('show presonal home page', '/u/:uid?', userPage.home);
PAGE.get('show challenge search result page', '/search/result', challengePage.search);

API.post('register a new user', '/signup', bodyParser({
    formLimit: '10mb',
    jsonLimit: '10mb'
}), validate(), Validator.checkSignUser, Api.signup, Common.success);
API.post('login', '/signin', bodyParser(), validate(), Validator.checkSignUser, Api.signin, Common.logined, Common.success);
API.post('create a new challenge', '/challenge/publish', Validator.checkLogin, bodyParser({
    formLimit: '15mb',
    jsonLimit: '15mb'
}), challengeApi.publish, Common.success);

exports.register = function(app) {
    app.use(Validator.checkLogin);
    app.use(mount('/', ROOT.middleware()));
    app.use(mount('/admin', ADMIN.middleware()));
    app.use(mount('/page', PAGE.middleware()));
    app.use(mount('/api', API.middleware()));
};