var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var webpack = require("webpack");
var del = require('del');
var argv = require('minimist')(process.argv.slice(2));

var DEBUG = !argv.release;
var paths = {
    scripts: 'src/**/*.js',
    api: 'api/**/*.*'
};

var dest = {build: 'build/', public: 'build/public/', api: 'build/api/'};

var watch = false;

gulp.task('cleanApi', function(cb) {
    del(dest.api, cb);
});


gulp.task('cleanPublic', function(cb) {
    del(dest.public, cb);
});

gulp.task('clean', ['cleanIndex', 'cleanPublic']);

gulp.task('api', ['cleanApi'], function() {
    return gulp.src(paths.api).
        pipe(gulp.dest(dest.api));
});

gulp.task("webpack", ['cleanPublic'], function(cb) {
    var started = false;
    var config = require('./webpack.config.js');
    var compiler = webpack(config);
    compile = function(err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }
        $.util.log('[webpack]', watch && started ? 'rebuild' : stats.toString({colors: true}));

        var jsonStats = stats.toJson();
        if (watch && started && jsonStats.errors.length > 0) {
            $.util.log('[webpack]', jsonStats.errors);
        }

        if (!started) {
            started = true;
            return cb();
        }
    };
    watch ? compiler.watch(300, compile) : compiler.run(compile);
});

gulp.task('watch', function() {
    watch = true;
    gulp.watch(paths.api, ['api']);
});

gulp.task('dev', ['watch', 'build'], function() {
    var express = require('express');
    var app = express();
    app.use('/', express.static(dest.build));
    var server  = require('http').createServer(app);
    server.listen(3000, '127.0.0.1', function() { console.log('listening on localhost 3000')});
});

gulp.task('build', ['webpack', 'api']);

gulp.task('default', ['build']);