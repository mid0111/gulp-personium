'use strict';

var expect = require('chai').expect;
var Personium = require('../index.js');
var fs = require('fs');
var path = require('path');
var request = require('request');
var sinon = require('sinon');

describe('upload file', function() {

  var server;
  var collection = 'test/resources';

  beforeEach(function() {
  });

  afterEach(function() {
    server.restore();
    server = null;
  });

  it('should upload js file.', function(done) {

    var filePath = collection + path.sep + 'test.js';
    var baseUrl = 'http://localhost/cellName';
    var token = 'masterToken';
    var requestUrl = baseUrl + '/' + filePath;
    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      token : token
    });

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal('Bearer ' + token);
      expect(obj.headers['Content-Type']).to.be.equal('text/javascript');
      expect(obj.rejectUnauthorized).to.be.false();
      callback();
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  it('should upload html file.', function(done) {

    var filePath = collection + path.sep + 'test.html';
    var baseUrl = 'http://localhost/cellName';
    var token = 'masterToken';
    var requestUrl = baseUrl + '/' + filePath;
    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      token : token
    });

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal('Bearer ' + token);
      expect(obj.headers['Content-Type']).to.be.equal('text/html');
      expect(obj.rejectUnauthorized).to.be.false();
      callback();
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  it('should upload css file.', function(done) {

    var filePath = collection + path.sep + 'test.css';
    var baseUrl = 'http://localhost/cellName';
    var token = 'masterToken';
    var requestUrl = baseUrl + '/' + filePath;
    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      token : token
    });

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal('Bearer ' + token);
      expect(obj.headers['Content-Type']).to.be.equal('text/css');
      expect(obj.rejectUnauthorized).to.be.false();
      callback();
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });
});
