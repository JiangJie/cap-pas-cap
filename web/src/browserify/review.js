'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $file = $('#file');
    var $submit = $('#submit');
    // 缓存已选文件的文件名，避免重复选择
    var max = 9;
    var cache = [];
    var imgsBase64 = [];

    $file.on('change', function(e) {
        console.log('file change', e);

        // 最多5张图片
        if (cache.length >= max) return;

        var files = e.target.files;

        var _files = [];
        Array.prototype.some.call(files, function(file) {
            // 坑爹。。。iphone上文件名全是image.jpg
            var name = file.name + file.lastModified + file.size;
            if (!~cache.indexOf(name)) {
                _files.push(file);
                cache.push(name);
            }

            if (cache.length >= max) return true;
        });

        _files.forEach(function(file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                console.log('file reader onload', e);
                var img = e.target.result;
                $('<div class="img" style="background-image: url(' + img + ');"></div>').insertBefore($file);

                imgsBase64.push(img);
            };
            reader.readAsDataURL(file);
        });
    });

    $('#reviewForm').on('submit', function(e) {
        if ($submit.hasClass('disabled')) return;

        e.preventDefault();

        var url = this.action;
        var method = this.method.toUpperCase();

        var $uid = $('#uidInput');
        var winner = $uid && $uid.val().trim();
        var desc = $('#desc').val().trim();

        if (url.split('/').pop() === 'moment') {
            if (!winner) return alert('Please fill up all the description.');
        }

        if (!desc) return alert('Please fill up all the description.');

        var data = {
            winner: winner,
            desc: desc
        };
        imgsBase64.length && (data.imgs = imgsBase64);

        console.log(data);

        $submit.addClass('disabled');

        $.ajax({
            url: url,
            type: method,
            data: data
        }).done(function(res) {
            console.log(res);
            window.location.href = '/page/challenge/' + res.result.cid;
        }).fail(function(xhr) {
            alert('Publish failed. Try again!');
            $submit.removeClass('disabled');
        });
    });
}

(function init() {
    bindEvent();
})();