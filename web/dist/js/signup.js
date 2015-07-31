(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = window.Zepto || window.$;

function bindEvent() {
    var $logo = $('#logo');
    var $file = $('#file');
    var $signupForm = $('#signupForm');

    var cache;
    var logoBase64;

    $signupForm.on('submit', function(e) {
        e.preventDefault();

        var uid = $('#uidInput').val();
        if(!~uid.indexOf('@')) return alert('请输入正确的邮箱地址');

        var pwd = $('#pwdInput').val();
        var repwd = $('#repwdInput').val();
        if(pwd !== repwd) return alert('密码和重复密码不一致');
        if(pwd.length < 6) return alert('密码长度不能小于6位');

        var nickname = $('#nicknameInput').val();
        var gender = $('#genderSelect').val();

        var data = {
            uid: uid,
            pwd: pwd
        };
        nickname && (data.nickname = nickname);
        gender && (data.gender = gender);
        logoBase64 && (data.logo = logoBase64);

        var url = this.action;
        var method = this.method.toUpperCase();
        $.ajax({
            url: url,
            type: method,
            data: data
        }).done(function(res) {
            console.log('success', res);
            window.location.href = '/page/signin';
        }).fail(function() {
            console.log('fail', arguments);
        });
    });

    $file.on('change', function(e) {
        console.log('file change', e);

        var file = e.target.files[0];
        var name = file.name + file.lastModified + file.size;
        if(cache === name) return;

        cache = name;

        var reader = new FileReader();
        reader.onload = function(e) {
            console.log('file reader onload', e);
            logoBase64 = e.target.result;
            $logo.css('background-image', 'url(' + logoBase64 + ');');
        };
        reader.readAsDataURL(file);
    });
}

(function init() {
    bindEvent();
})();
},{}]},{},[1]);
