(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $price = $('#price');
    var price = Number($price.html()) || 0;
    var $num = $('#num');
    var $total = $('#total');

    $('#div').on('tap', function() {
        var num = Math.max(Number($num.html()) - 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#add').on('tap', function() {
        var num = Math.max(Number($num.html()) + 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#join').on('tap', function() {
        if(this.classList.contains('disabled')) return;

        var cid = this.dataset.cid;
        var url = '/api/join/' + cid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('disabled');
            $(this).text('Joined');

            window.location.href = '/page/challenge/' + cid;
        }.bind(this));
    });
}

(function init() {
    bindEvent();
})();
},{}]},{},[1]);
