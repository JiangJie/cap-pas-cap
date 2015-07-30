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
            $logo.css('background-image', 'url(' + e.target.result + ');');
            logoBase64 = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

(function init() {
    bindEvent();
})();