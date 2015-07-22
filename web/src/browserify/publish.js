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

$('#publishForm').on('submit', function(e) {
    e.preventDefault();

    var name = $('#nameInput').val();
    var dealline = $('#deadlineInput').val();
    var start = $('#startTimeInput').val();
    var end = $('#endTimeInput').val();
    var location = $('#locationInput').val();
    var fee = $('#feeInput').val();
    var max = $('#participatorsInput').val();
    var desc = $('#description').val();
    var difficulty = $('.icon-difficulty.active').length;

    if(!name || !start || !end || !location || !fee || !max || !desc) return alert('请输入完整信息');

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

    dealline && (data.dealline = dealline);
    difficulty && (data.difficulty = difficulty);

    console.log(data);

    $.ajax({
        url: url,
        type: method,
        data: data
    }).done(function(res) {
        console.log(res);
    }).fail(function(xhr) {
        if(xhr.status === 403) {
            var flag = confirm('还未登录，先去登录吗？');
            if(flag) window.location.href = '/page/signin';
        }
    });
});