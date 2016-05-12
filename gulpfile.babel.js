import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import componentsWebpackConfig from './webpack.config';

gulp.task('components-js', ['clean'], (cb) => {
  webpack(componentsWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

// gulp.task('sass', function () {
//     return gulp.src('src/styles#<{(||)}>#*.scss')
//                .pipe(plugins.sass().on('error', plugins.sass.logError))
//                .pipe(gulp.dest('./dist'));
// });
//
// gulp.task('autoprefixer', ['sass'], function () {
//     return gulp.src('./dist/styles.css')
//                .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
//                .pipe(gulp.dest('./dist'));
// });
//
// gulp.task('minify-css', ['autoprefixer'], function () {
//     return gulp.src('./dist/styles.css')
//                .pipe(plugins.rename({suffix: '.min'}))
//                .pipe(plugins.cleanCss())
//                .pipe(gulp.dest('./dist'))
//                .pipe(plugins.livereload());
// });

gulp.task('clean', (cb) => {
  rimraf('./dist', cb);
});

gulp.task('build', ['clean', 'components-js']);

gulp.task('watch', ['default'], () => {
    // gulp.watch('src/styles#<{(||)}>#*.scss', ['sass', 'autoprefixer', 'minify-css']);
    gulp.watch('src/components/**/*.js', ['build']);
});

gulp.task('default', ['build']);
