var metAnnotation = require('../')
var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var _ = require('lodash')

var describe = lab.describe
var it = lab.it

var expect = Code.expect

var filesmock = {
  'test/doc/sample.js': {},
  'test/doc/sample-1.js': {}
}

var metalsmithmock = {}

describe('Metalsmith annotation', function () {
  it('should create html annotation', function (done) {
    var testfiles = _.cloneDeep(filesmock)
    var metalsmith = _.cloneDeep(metalsmithmock)

    metAnnotation({
      directory: '',
      workingdir: __dirname + '/../'
    })(testfiles, metalsmith, function () {
      expect(testfiles['test/doc/sample.html'].contents).to.be.not.null
      expect(testfiles['test/doc/sample-1.html'].contents).to.be.not.null
      expect(testfiles['test/doc/sample.html'].contents.indexOf('<div id="container">') >= 0).to.true
      expect(testfiles['test/doc/sample-1.html'].contents.indexOf('<div id="container">') >= 0).to.true

      done()
    })
  })
})
