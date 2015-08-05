'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    $('.type').on('tap', function() {
        var type = this.dataset.type;
        window.location.href = '/page/search/result?type=' + type;
    });
}

(function init() {
    bindEvent();
})();