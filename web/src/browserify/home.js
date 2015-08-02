'use strict';

var $ = window.Zepto || window.$;

require('./mylib/footer');

function bindEvent() {
    $('#follow').on('tap', function() {
        if(this.classList.contains('done')) return;

        var uid = this.dataset.uid;
        var url = '/api/follow/' + uid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('done');
            $(this).text('Followed');
        }.bind(this));
    });
}

(function init() {
    bindEvent();
})();