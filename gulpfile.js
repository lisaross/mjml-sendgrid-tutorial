const { series, dest, src } = require('gulp')
const mjml = require('gulp-mjml')
const htmlmin = require('gulp-htmlmin')
const mjmlEngine = require('mjml')

// function buildHbrs(cb) {
//   return src('./src/hbrs/*.hbr')
//     .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
//     .on('error', handleError)
//     .pipe(dest('./html'))
//   cb();
// }


function buildMjml(cb) {
  return src('./src/mjml/*.mjml')
    .pipe(mjml(mjmlEngine, { validationLevel: 'strict' }))
    .on('error', handleError)
    .pipe(dest('./src/html'))
  cb();
}

function buildHtml(cb) {
  return src('./src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
    .pipe(dest('./dist'))
  cb();
}

exports.default = series(buildMjml, buildHtml);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
