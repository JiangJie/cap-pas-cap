'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $submit = $('#submit');
    $('#commentForm').on('submit', function(e) {
        if($submit.hasClass('disabled')) return;

        e.preventDefault();

        var desc = $('#desc').val().trim();
        if(!desc) return alert('Please fill comment.');

        var data = {
            desc: desc
        };

        var url = this.action;
        var method = this.method.toUpperCase();

        $submit.addClass('disabled');
        $.ajax({
            url: url,
            type: method,
            data: data
        }).done(function(res) {
            console.log('success', res);
            // window.location.href = '/';
        }).fail(function(err) {
            console.log('fail', arguments);

            alert('Submit fail.');
        }).always(function() {
            $submit.removeClass('disabled');
        });
    });
}

(function init() {
    bindEvent();
})();