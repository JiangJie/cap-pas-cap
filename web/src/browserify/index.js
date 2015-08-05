'use strict';

var $ = window.Zepto || window.$;

require('./mylib/tabs');
require('./mylib/cid');
require('./mylib/footer');

function bindEvent() {
    $('#search').on('tap', function() {
        window.location.href = '/page/search';
    });
}

(function init() {
    $('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height() - $('.page > .tabs').height());
    bindEvent();
})();