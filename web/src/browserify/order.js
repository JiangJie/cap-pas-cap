'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $price = $('#price');
    var price = Number($price.html()) || 0;
    var $num = $('#num');
    var $total = $('#total');
    var num = 1;

    $('#div').on('tap', function() {
        num = Math.max(Number($num.html()) - 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#add').on('tap', function() {
        num = Math.max(Number($num.html()) + 1, 0);
        $num.html(num);
        $total.html(price * num);
    });

    $('#join').on('tap', function() {
        if(this.classList.contains('disabled')) return;

        if(!num) return alert('no amount');

        var cid = this.dataset.cid;
        var url = '/api/join/' + cid;

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                num: num
            }
        }).done(function() {
            this.classList.add('disabled');
            $(this).text('Joined');

            alert('join successfully');

            window.location.href = '/page/challenge/' + cid;
        }.bind(this));
    });
}

(function init() {
    bindEvent();
})();