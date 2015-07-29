'use strict';

var $ = window.$ || window.Zepto;

$('[data-cid]').on('tap', function() {
    var cid = this.dataset.cid;
    window.location.href = '/page/challenge/' + cid;
});