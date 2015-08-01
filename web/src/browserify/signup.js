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

        var uid = $('#uidInput').val().trim();
        if(!uid || !~uid.indexOf('@')) return alert('Invalide E-mail');

        var pwd = $('#pwdInput').val().trim();
        if(!pwd) return alert('Password should be required');
        if(pwd.length < 6) return alert('Password should be more than 6 characters');
        var repwd = $('#repwdInput').val().trim();
        if(pwd !== repwd) return alert('Inconsistent password');

        var nickname = $('#nicknameInput').val().trim();
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