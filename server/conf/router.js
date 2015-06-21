'use strong';

/*
npm模块
*/
const Router = require('koa-router');
const validate = require('koa-validate');

/*
内部模块
*/
const views = require('../views');
const admin = require('../views/admin');
const validator = require('../views/validator');

const API = new Router();

API.get('show index page', '/', views.index);

API.get('show signin page', '/signin', views.signin);

API.get('/admin/create_user', validate(), validator.checkUser, admin.createUser);

exports.rule = API.middleware();