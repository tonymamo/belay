import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';

const plugins = loadPlugins();

import componentsWebpackConfig from './webpack.config.js';

gulp.task('components-js', (cb) => {
    webpack(componentsWebpackConfig, (err, stats) => {
        if(err) throw new plugins.util.PluginError('webpack', err);

        plugins.util.log('[webpack]', stats.toString());

        cb();
    });
});

gulp.task('copy-package-json', () => {
    return gulp.src('package.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-license', () => {
    return gulp.src('LICENSE')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-readme', () => {
    return gulp.src('README.md')
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-docs', () => {
    return gulp.src('docs/**/*.md')
    .pipe(gulp.dest('./dist/docs'));
});

gulp.task('copy-sass', () => {
    return gulp.src('src/styles/**/*.*')
    .pipe(gulp.dest('./dist/lib/styles'));
});

gulp.task('copy-fonts', () => {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('./dist/lib/fonts'));
});

gulp.task('build', [
    'copy-readme',
    'copy-docs',
    'copy-package-json',
    'copy-license',
    'copy-sass',
    'components-js',
    'copy-fonts'
]);

gulp.task('watch', ['default'], () => {
    gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['build']);
