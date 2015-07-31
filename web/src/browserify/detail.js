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
}

(function init() {
    bindEvent();
})();