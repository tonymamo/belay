import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import componentsWebpackConfig from './webpack.config.js';

gulp.task('components-js', ['clean'], (cb) => {
    webpack(componentsWebpackConfig, (err, stats) => {
        if(err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('copy-package-json', ['clean'], () => {
    return gulp.src('package.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-license', ['clean'], () => {
    return gulp.src('LICENSE')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-readme', ['clean'], () => {
    return gulp.src('README.md')
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', (cb) => {
    rimraf('./dist', cb);
});

gulp.task('build', [
    'clean',
    'copy-readme',
    'copy-package-json',
    'copy-license',
    'components-js'
]);

gulp.task('watch', ['default'], () => {
    gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build']);
