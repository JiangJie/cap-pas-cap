(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = window.$ || window.Zepto;

require('./mylib/tabs');
require('./mylib/cid');

$('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height() - $('.page > .tabs').height());

$('#profileMenu').on('tap', function() {
    window.location.href = '/page/u';
});
},{"./mylib/cid":2,"./mylib/tabs":3}],2:[function(require,module,exports){
'use strict';

var $ = window.$ || window.Zepto;

$('[data-cid]').on('tap', function() {
    var cid = this.dataset.cid;
    window.location.href = '/page/challenge/' + cid;
});
},{}],3:[function(require,module,exports){
'use strict';

var $ = window.$ || window.Zepto;

var $tabs = $('[data-tab]');
var $contents = $('[data-content]');

$tabs.on('tap', function() {
    var $this = $(this);

    if($this.hasClass('active')) return;

    var name = this.dataset.tab;

    $tabs.removeClass('active');
    $this.addClass('active');
    $contents.addClass('hide');
    $contents.filter('[data-content=' + name + ']').removeClass('hide');
});
},{}]},{},[1]);
