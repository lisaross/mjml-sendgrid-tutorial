const gulp = require('gulp')

const mjml = require('gulp-mjml')
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
