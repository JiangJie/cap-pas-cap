'use strong';

/*
npm模块
*/
const Router = require('koa-router');

/*
内部模块
*/
const views = require('../views');

const API = new Router();

API.get('show index page', '/', views.index);

API.get('show signin page', '/signin', views.signin);

exports.rule = API.middleware();