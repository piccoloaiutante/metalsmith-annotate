var metAnnotation = require('../')
var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()
var _ = require('lodash')
var path = require('path')

var describe = lab.describe
var it = lab.it

var expect = Code.expect

var filesMock = {
  'sample.js': {},
  'sample-1.js': {}
}

var metalsmithMock = {}

describe('Metalsmith annotation', function () {

  it('should create html annotation', function (done) {
    var testFiles = _.cloneDeep(filesMock),
      metalsmith = _.cloneDeep(metalsmithMock)

    metAnnotation({
      directory: path.join(__dirname,'doc')
    })(testFiles, metalsmith, function () {

      expect(testFiles['sample.js'].html).to.be.not.null
      expect(testFiles['sample-1.js'].html).to.be.not.null
      expect(testFiles['sample.js'].html.indexOf('<div id="container">')>0).to.true
      expect(testFiles['sample-1.js'].html.indexOf('<div id="container">')>0).to.true

      done()
    })

  })
})
