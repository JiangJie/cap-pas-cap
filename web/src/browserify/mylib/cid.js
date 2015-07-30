'use strict';

var $ = window.Zepto || window.$;

$('[data-cid]').on('tap', function() {
    var cid = this.dataset.cid;
    window.location.href = '/page/challenge/' + cid;
});