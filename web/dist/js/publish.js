!function t(e,n,i){function r(o,u){if(!n[o]){if(!e[o]){var f="function"==typeof require&&require;if(!u&&f)return f(o,!0);if(a)return a(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[o]={exports:{}};e[o][0].call(c.exports,function(t){var n=e[o][1][t];return r(n?n:t)},c,c.exports,t,e,n,i)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)r(i[o]);return r}({1:[function(t,e,n){"use strict";function i(){var t=r(".icon-difficulty"),e=r("#file"),n=[];t.on("tap",function(){var e=Number(this.dataset.i);t.removeClass("active"),t.filter(function(){return Number(this.dataset.i)<=e}).addClass("active")}),r("#publishForm").on("submit",function(t){t.preventDefault();var e=r("#nameInput").val(),i=r("#deadlineInput").val(),a=r("#startTimeInput").val(),o=r("#endTimeInput").val(),u=r("#locationInput").val(),f=r("#feeInput").val(),l=r("#participatorsInput").val(),c=r("#description").val(),s=r(".icon-difficulty.active").length;if(!(e&&a&&o&&u&&f&&l&&c))return void 0;var d=this.action,v=this.method.toUpperCase(),p={name:e,start:a,end:o,location:u,fee:f,max:l,desc:c,launch:"I"};i&&(p.deadline=i),s&&(p.difficulty=s),n.length&&(p.imgs=n),r.ajax({url:d,type:v,data:p}).done(function(t){window.location.href="/page/challenge/"+t.result.cid}).fail(function(t){if(403===t.status){var e=confirm("还未登录，先去登录吗？");e&&(window.location.href="/page/signin")}})});var i=5,a=[];e.on("change",function(t){if(!(a.length>=i)){var o=t.target.files,u=[];Array.prototype.some.call(o,function(t){var e=t.name+t.lastModified+t.size;return~a.indexOf(e)||(u.push(t),a.push(e)),a.length>=i?!0:void 0}),u.forEach(function(t){var i=new FileReader;i.onload=function(t){var i=t.target.result;r('<div class="img" style="background-image: url('+i+');"></div>').insertBefore(e),n.push(i)},i.readAsDataURL(t)})}})}var r=window.$||window.Zepto;i()},{}]},{},[1]);