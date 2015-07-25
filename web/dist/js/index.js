(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = window.$ || window.Zepto;

$('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height());

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

$('[data-cid]').on('tap', function() {
    var cid = this.dataset.cid;
    window.location.href = '/page/challenge/' + cid;
});

$('#profileMenu').on('tap', function() {
    window.location.href = '/page/u';
});
},{}]},{},[1]);
