'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $price = $('#price');
    var price = Number($price.html()) || 0;
    var $num = $('#num');
    var $total = $('#total');

    $('#div').on('tap', function() {
        var num = Math.max(Number($num.html()) - 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#add').on('tap', function() {
        var num = Math.max(Number($num.html()) + 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#join').on('tap', function() {
        if(this.classList.contains('disabled')) return;

        var cid = this.dataset.cid;
        var url = '/api/join/' + cid;

        $.ajax({
            url: url,
            type: 'POST'
        }).done(function() {
            this.classList.add('disabled');
            $(this).text('Joined');

            window.location.href = '/page/challenge/' + cid;
        }.bind(this));
    });
}

(function init() {
    bindEvent();
})();