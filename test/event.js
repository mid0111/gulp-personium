'use strict';

var expect = require('chai').expect;
var Personium = require('../index.js');
var request = require('request');
var sinon = require('sinon');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');

describe('Event stream', function() {

  var personium;
  var collection = 'test/resources';
  var filePath = collection + path.sep + 'test.html';
  var mock;
  
  beforeEach(function() {
    personium = new Personium({
      baseUrl: 'http://localhost/cellName',
      baseDir: collection,
      token : 'masterToken'
    });
  });

  afterEach(function() {
    mock.restore();
    mock = null;
  });

  it('should call upload request.', function(done) {
    var stream = personium.upload();

    mock = sinon.mock(request);
    mock.expects('put').once();

    stream.on('data', function(file) {
      expect(file.path).to.be.equal(filePath);
      expect(file.contents.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      mock.verify();
      done();
    });

    stream.write(new gutil.File({
      path : filePath,
      contents : fs.readFileSync(filePath)
    }));
  });

  it('should not call upload request when file contents is null.', function(done) {
    var stream = personium.upload();

    mock = sinon.mock(request);
    mock.expects('put').never();

    stream.on('data', function(file) {
      expect(file.path).to.be.equal(filePath);
      expect(file.contents).to.be.null();
      mock.verify();
      done();
    });

    stream.write(new gutil.File({
      path : filePath,
      contents : null
    }));
  });

  it('should not call upload request when file contents is stream.', function(done) {
    var stream = personium.upload();

    mock = sinon.mock(request);
    mock.expects('put').never();

    stream.on('error', function(err) {
      expect(err.message).to.be.equal('Streaming not supported');
      expect(err.plugin).to.be.equal('gulp-personium');
      mock.verify();
      done();
    });

    stream.write(new gutil.File({
      path : filePath,
      contents : fs.createReadStream(filePath)
    }));
  });

});
