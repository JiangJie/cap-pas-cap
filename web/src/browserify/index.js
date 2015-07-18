'use strict';

var $ = window.$ || window.Zepto;

var $merchantTab = $('#merchantTab');
var $individualTab = $('#individualTab');
var $merchantContent = $('#merchantContent');
var $individualContent = $('#individualContent');

$merchantTab.on('tap', function() {
    if($merchantTab.hasClass('active')) return;

    $merchantTab.addClass('active');
    $individualTab.removeClass('active');
    $merchantContent.removeClass('hide');
    $individualContent.addClass('hide');
});

$individualTab.on('tap', function() {
    if($individualTab.hasClass('active')) return;

    $merchantTab.removeClass('active');
    $individualTab.addClass('active');
    $merchantContent.addClass('hide');
    $individualContent.removeClass('hide');
});