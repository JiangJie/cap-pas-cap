'use strict';

var $ = window.$ || window.Zepto;

(function init() {
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
})();