'use strict';

var $ = window.Zepto || window.$;

var $tabs = $('[data-tab]');
var $contents = $('[data-content]');

$tabs.on('tap', function() {
    var $this = $(this);

    if($this.hasClass('active')) return;

    var name = this.dataset.tab;

    $tabs.removeClass('active');
    $this.addClass('active');
    $contents.addClass('hide');
    $contents.filter('[data-content=' + name + ']').removeClass('hide');
});