var fs = require('fs')
var rimraf = require('rimraf')
var path = require('path')
var metAnnotation = require('../')
var Code = require('code')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var before = lab.before
var expect = Code.expect

var outputFolder = path.join(__dirname, 'output')

describe('Metalsmith annotation', function () {
  before(function (done) {
    rimraf(outputFolder, function (err) {
      if (err) {
        return done(err)
      }
      fs.mkdir(outputFolder, function (err) {
        if (err) {
          return done(err)
        }
        done()
      })
    })
  })

  it('should create documentation', function (done) {
    var files = [path.join(__dirname, 'doc/sample.js')]

    var outputFolders = [outputFolder]

    metAnnotation.createDoc(files, outputFolders, function () {
      fs.readdir(path.join(__dirname, 'output'), function (err, files) {
        if (err) {
          done(err)
        }
        expect(files.length).to.equal(3)

        done()
      })
    })
  })
})
