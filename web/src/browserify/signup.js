'use strict';

var $ = window.$ || window.Zepto;

var $signupForm = $('#signupForm');

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

    var url = this.action;
    var method = this.method.toUpperCase();
    $.ajax({
        url: url,
        type: method,
        data: data
    }).done(function(res) {
        console.log('success', res);
    }).fail(function() {
        console.log('fail', arguments);
    });
});