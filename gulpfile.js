const gulp = require('gulp')

const mjml = require('gulp-mjml')
const htmlmin = require('gulp-htmlmin')
const mjmlEngine = require('mjml')

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('default', function () {
  return gulp.src('./views/*.mjml')
    .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
    .on('error', handleError)
    .pipe(gulp.dest('./html'))
})

gulp.task('minify', () => {
  return gulp.src('./html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
})
