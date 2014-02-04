var should = require('should');
var gutil = require('gulp-util');
var fs = require('fs');
var pj = require('path').join;

function createVinyl(fileName, contents) {
  var base = pj(__dirname, '');
  var filePath = pj(base, fileName);
  return new gutil.File({
    cwd: __dirname,
    base: base,
    path: filePath,
    contents: contents || fs.readFileSync(filePath)
  });
}

describe('gulp-absurd', function () {
  describe('absurd()', function () {

    it('should compile single js file to css', function (done) {
      var file = createVinyl('data/styles.js');
      var stream = require('../')({ minify: true });
      stream.on('data', function (resFile) {
        should.exist(resFile);
        should.exist(resFile.path);
        should.exist(resFile.relative);
        should.exist(resFile.contents);
        resFile.contents.toString().should.equal('body{margin: 0;padding: 0;font-style: 20px;}');
        done();
      });
      stream.write(file);
    }); 

    it('should compile single js file to html', function (done) {
      var file = createVinyl('data/page.js');
      var stream = require('../')({ morph: 'html', data: { name: 'Krasimir Tsonev' }, minify: true });
      stream.on('data', function (resFile) {
        should.exist(resFile);
        should.exist(resFile.path);
        should.exist(resFile.relative);
        should.exist(resFile.contents);
        resFile.contents.toString().should.equal('<div class="header"><p>My name is Krasimir Tsonev</p></div>');
        done();
      });
      stream.write(file);
    }); 

  });
});