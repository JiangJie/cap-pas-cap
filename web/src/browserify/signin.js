'use strict';

var $ = window.$ || window.Zepto;

var $signinForm = $('#signinForm');

$signinForm.on('submit', function(e) {
    e.preventDefault();

    var uid = $('#uidInput').val();
    if(!~uid.indexOf('@')) return alert('请输入正确的邮箱地址');

    var pwd = $('#pwdInput').val();

    var data = {
        uid: uid,
        pwd: pwd
    };

    var url = this.action;
    var method = this.method.toUpperCase();
    $.ajax({
        url: url,
        type: method,
        data: data
    }).done(function(res) {
        console.log('success', res);
        window.location.href = '/';
    }).fail(function() {
        console.log('fail', arguments);
    });
});