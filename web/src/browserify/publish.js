'use strict';

var $ = window.$ || window.Zepto;

function bindEvent() {
    var $difficultys = $('.icon-difficulty');
    var $file = $('#file');
    var $submit = $('#submit');
    var imgsBase64 = [];

    $difficultys.on('tap', function() {
        var i = Number(this.dataset.i);

        $difficultys.removeClass('active');
        // var $this = $(this);
        // $this.addClass('active');
        $difficultys.filter(function() {
            return Number(this.dataset.i) <= i;
        }).addClass('active');
    });

    $('#publishForm').on('submit', function(e) {
        if($submit.hasClass('disabled')) return;

        e.preventDefault();

        var name = $('#nameInput').val();
        var deadline = $('#deadlineInput').val();
        var start = $('#startTimeInput').val();
        var end = $('#endTimeInput').val();
        var location = $('#locationInput').val();
        var fee = $('#feeInput').val();
        var max = $('#participatorsInput').val();
        var desc = $('#description').val();
        var difficulty = $('.icon-difficulty.active').length;

        if(!name || !start || !end || !location || !fee || !max || !desc) return alert('Please fill up all the informations.');

        var url = this.action;
        var method = this.method.toUpperCase();

        var data = {
            name: name,
            start: start,
            end: end,
            location: location,
            fee: fee,
            max: max,
            desc: desc,
            // Individual
            launch: 'I'
        };

        deadline && (data.deadline = deadline);
        difficulty && (data.difficulty = difficulty);
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
            if(xhr.status === 403) {
                var flag = confirm('还未登录，先去登录吗？');
                if(flag) window.location.href = '/page/signin';
            }
            alert('Publish failed. Try again!');
            $submit.removeClass('disabled');
        });
    });
    
    // 缓存已选文件的文件名，避免重复选择
    var max = 5;
    var cache = [];
    $file.on('change', function(e) {
        console.log('file change', e);

        // 最多5张图片
        if(cache.length >= max) return;

        var files = e.target.files;

        var _files = [];
        Array.prototype.some.call(files, function(file) {
            // 坑爹。。。iphone上文件名全是image.jpg
            var name = file.name + file.lastModified + file.size;
            if(!~cache.indexOf(name)) {
                _files.push(file);
                cache.push(name);
            }

            if(cache.length >= max) return true;
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
}

bindEvent();