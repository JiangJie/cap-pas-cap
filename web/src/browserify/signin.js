'use strict';

var $ = window.$ || window.Zepto;

var $signinForm = $('#signinForm');

$signinForm.on('submit', function(e) {
    e.preventDefault();

    var uid = $('#uidInput').val().trim();
    if(!uid || !~uid.indexOf('@')) return alert('Invalide E-mail');

    var pwd = $('#pwdInput').val().trim();
    if(!pwd) return alert('Password should be required');

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
    }).fail(function(err) {
        console.log('fail', arguments);
        if(err.status === 403) return alert('E-mail and password not match.');

        alert('Signin fail.');
    });
});