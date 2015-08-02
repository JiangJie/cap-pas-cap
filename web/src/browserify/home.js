'use strict';

var $ = window.Zepto || window.$;

require('./mylib/footer');

function bindEvent() {
    var $follow = $('#follow');
    var $followers = $('#followers');

    $follow.on('tap', function() {
        if(this.classList.contains('done')) return;

        var uid = this.dataset.uid;
        var url = '/api/follow/' + uid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('done');
            $follow.text('Followed');
            $followers.html((parseInt($followers.html()) + 1);
        }.bind(this));
    });
}

(function init() {
    bindEvent();
})();