'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    $('#logout').on('tap', function() {
        document.cookie = 'SID=;domain=.airj.me;path=/';
        window.location.href = '/page/signin';
    });
}

(function init() {
    bindEvent();
})();