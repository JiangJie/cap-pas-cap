'use strict';

var $ = window.$ || window.Zepto;

require('./mylib/tabs');

$('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height() - $('.page > .tabs').height());

$('[data-cid]').on('tap', function() {
    var cid = this.dataset.cid;
    window.location.href = '/page/challenge/' + cid;
});

$('#profileMenu').on('tap', function() {
    window.location.href = '/page/u';
});