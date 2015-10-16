var metAnnotation = require('../')
var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var _ = require('lodash')

var describe = lab.describe
var it = lab.it

var expect = Code.expect

var filesMock = {
  'test/doc/sample.js': {},
  'test/doc/sample-1.js': {}
}

var metalsmithMock = {}

describe('Metalsmith annotation', function () {
  it('should create html annotation', function (done) {
    var testFiles = _.cloneDeep(filesMock)
    var metalsmith = _.cloneDeep(metalsmithMock)

    metAnnotation({
      directory: '',
      workingdir: __dirname + '/../'
    })(testFiles, metalsmith, function () {
      expect(testFiles['test/doc/sample.html'].contents).to.be.not.null
      expect(testFiles['test/doc/sample-1.html'].contents).to.be.not.null
      expect(testFiles['test/doc/sample.html'].contents.indexOf('<div id="container">') >= 0).to.true
      expect(testFiles['test/doc/sample-1.html'].contents.indexOf('<div id="container">') >= 0).to.true

      done()
    })
  })
})
