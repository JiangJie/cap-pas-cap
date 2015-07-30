'use strict';

var $ = window.Zepto || window.$;

$('#challengeMenu').on('tap', function() {
    window.location.href = '/';
});
$('#rankingMenu').on('tap', function() {
    window.location.href = '/page/ranking';
});
$('#momentMenu').on('tap', function() {
    window.location.href = '/page/moment';
});
$('#profileMenu').on('tap', function() {
    window.location.href = '/page/u';
});