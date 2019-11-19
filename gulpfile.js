const { series, dest, src } = require('gulp')
const mjml = require('gulp-mjml')
const htmlmin = require('gulp-htmlmin')
const mjmlEngine = require('mjml')

function buildMjml(cb) {
  return src('./views/*.mjml')
    .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
    .on('error', handleError)
    .pipe(dest('./html'))
  cb();
}

function buildHtml(cb) {
  return src('./html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
  cb();
}

exports.default = series(buildMjml, build);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
