'use strict';

var $ = window.$ || window.Zepto;

require('./mylib/tabs');

function bindEvent() {
    $('#favorite').on('tap', function() {
        if(this.classList.contains('done')) return;

        var cid = this.dataset.cid;
        var url = '/api/favorite/' + cid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('done');
            $(this).text('Favorited');
        }.bind(this));
    });

    $('.icon-star').on('tap', function() {
        if(this.classList.contains('done')) return;

        var cid = this.dataset.cid;
        var rid = this.dataset.rid;

        var url = '/api/star/' + cid + '/' + rid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('done');
            var $num = $(this).next('.num');
            $num.html(parseInt($num.html()) + 1);
        }.bind(this));

    });
}

(function init() {
    bindEvent();
})();