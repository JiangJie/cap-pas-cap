'use strict';

const path = require('path');

const es = require('event-stream');
const glob = require('glob');
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 源文件存放路径
const src = './src/';
// 构建生成的文件存放路径
const dist = './dist/';

// 文件映射
const paths = {
    browserify: {
        src: 'browserify/*.js',
        dist: 'js'
    },
    lib: {
        src: 'browserify/lib/*.js',
        dist: 'js/lib'
    },
    stylus: {
        src: 'stylus/!(_)*.styl',
        watchSrc: 'stylus/**',
        dist: 'css'
    },
    img: {
        src: 'stylus/img/**',
        dist: 'css/img'
    },
    icon: {
        src: 'stylus/icon/**',
        dist: 'css/icon'
    }
};

Object.keys(paths).forEach(function(item) {
    paths[item].watchSrc = src + (paths[item].watchSrc || paths[item].src);
    paths[item].src = src + paths[item].src;
    paths[item].dist = dist + paths[item].dist;
});

console.log(paths);

function js(done) {
    const browserifyFiles = glob.sync(paths.browserify.src);
    const browserifyTasks = browserifyFiles.map(function(file) {
        console.log('browserify', file, path.basename(file));
        return browserify(file)
            .bundle()
            .pipe(source(path.basename(file)))
            .pipe(gulp.dest(paths.browserify.dist));
    });

    es.merge(browserifyTasks).on('end', done);
}

function lib() {
    return gulp.src(paths.lib.src)
        .pipe(gulp.dest(paths.lib.dist));
}

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
function icon() {
    return gulp.src(paths.icon.src)
        .pipe(gulp.dest(paths.icon.dist));
}

function clean(done) {
    del(dist, done);
}

function watch() {
    gulp.watch(paths.browserify.watchSrc, js);
    gulp.watch(paths.stylus.watchSrc, css);
    gulp.watch(paths.img.watchSrc, img);
    gulp.watch(paths.icon.watchSrc, icon);
}
gulp.task(clean);

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(js, lib, css, img, icon)
));

gulp.task('dev', gulp.series('default', watch));