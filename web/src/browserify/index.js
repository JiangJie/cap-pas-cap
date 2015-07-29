'use strict';

var $ = window.$ || window.Zepto;

require('./mylib/tabs');
require('./mylib/cid');

$('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height() - $('.page > .tabs').height());

$('#profileMenu').on('tap', function() {
    window.location.href = '/page/u';
});