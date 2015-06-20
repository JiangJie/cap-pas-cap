'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var del = require('del');

// 源文件存放路径
var src = './src/';
// 构建生成的文件存放路径
var dist = './dist/';

// 文件映射
var paths = {
    stylus: {
        src: 'stylus/!(_)*.styl',
        watchSrc: 'stylus/*.styl',
        dist: 'css'
    },
    img: {
        src: 'stylus/img/**',
        dist: 'css/img'
    }
};

Object.keys(paths).forEach(function(item) {
    paths[item].src = src + paths[item].src;
    paths[item].watchSrc = src + (paths[item].watchSrc || paths[item].src);
    paths[item].dist = dist + paths[item].dist;
});

console.log(paths);

function css() {
    return gulp.src(paths.stylus.src)
        .pipe(stylus({
            use: nib()
        }))
        .pipe(gulp.dest(paths.stylus.dist));
}

function img() {
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dist));
}

function clean(done) {
    del(dist, done);
}

function watch() {
    gulp.watch(paths.stylus.watchSrc, css);
    gulp.watch(paths.img.watchSrc, img);
}
gulp.task(clean);

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(css, img)
));

gulp.task('dev', gulp.series('default', watch));