'use strict';

var $ = window.$ || window.Zepto;

var $difficultys = $('.icon-difficulty');
$difficultys.on('tap', function() {
    var i = Number(this.dataset.i);

    $difficultys.removeClass('active');
    // var $this = $(this);
    // $this.addClass('active');
    $difficultys.filter(function() {
        return Number(this.dataset.i) <= i;
    }).addClass('active');
});

$('#publishForm').on('submit', function() {

});