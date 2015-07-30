'use strict';

var $ = window.Zepto || window.$;

require('./mylib/tabs');
require('./mylib/cid');
require('./mylib/footer');

(function init() {
    $('.page > .main').height($(document.body).height() - $('.page > header').height() - $('.page > footer').height() - $('.page > .tabs').height());
})();