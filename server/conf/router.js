'use strict';

/*
npm模块
*/
const Router = require('koa-router');

/*
内部模块
*/
const views = require('../views');

const API = new Router();

API.get('get index page', '/', views.index);

exports.rule = API.middleware();