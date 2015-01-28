'use strict';

var expect = require('chai').expect;
var Personium = require('../index.js');
var fs = require('fs');
var path = require('path');
var request = require('request');
var sinon = require('sinon');
var File = require('vinyl');

describe('Authentication', function() {

  var server;
  var collection = 'test/resources';
  var filePath = collection + path.sep + 'test.js';
  var baseUrl = 'http://localhost/cellName';
  var requestUrl = baseUrl + '/' + filePath;

  beforeEach(function() {
  });

  afterEach(function() {
    server.restore();
    server = null;
  });

  it('should set basic credentials.', function(done) {

    var user = 'User0001';
    var password = 'Password00000000001';

    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      user: user,
      password: password
    });

    var expectedCredential = 'Basic ' + toBase64(user + ':' + password);

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal(expectedCredential);
      expect(obj.headers['Content-Type']).to.be.equal('text/javascript');
      expect(obj.rejectUnauthorized).to.be.false();
      callback(undefined, {statusCode: 204});
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  it('should set bearer token.', function(done) {

    var token = 'toooooooooooooken';

    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      token: token
    });

    var expectedCredential = 'Bearer ' + token;

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal(expectedCredential);
      expect(obj.headers['Content-Type']).to.be.equal('text/javascript');
      expect(obj.rejectUnauthorized).to.be.false();
      callback(undefined, {statusCode: 204});
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  it('should set bearer token when either property user and bearer are set.', function(done) {

    var token = 'toooooooooooooken';
    var user = 'uuuuuuser';

    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection,
      token: token,
      user: user
    });

    var expectedCredential = 'Bearer ' + token;

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal(expectedCredential);
      expect(obj.headers['Content-Type']).to.be.equal('text/javascript');
      expect(obj.rejectUnauthorized).to.be.false();
      callback(undefined, {statusCode: 204});
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  it('should not set Authorization header.', function(done) {

    var personium = new Personium({
      baseUrl: baseUrl,
      baseDir: collection
    });

    var expectedCredential = null;

    // fake request
    server = sinon.stub(request, 'put', function(obj, callback) {
      expect(obj.url).to.be.equal(requestUrl);
      expect(obj.body.toString('utf8')).to.be.equal(fs.readFileSync(filePath, 'utf8'));
      expect(obj.headers['Authorization']).to.be.equal(expectedCredential);
      expect(obj.headers['Content-Type']).to.be.equal('text/javascript');
      expect(obj.rejectUnauthorized).to.be.false();
      callback(undefined, {statusCode: 204});
    });

    personium.upload(filePath, function(file) {
      expect(file).to.be.equal(filePath);
      done();
    });
  });

  function toBase64(str) {
    return new Buffer(str, 'utf8').toString('base64');
  }

});
