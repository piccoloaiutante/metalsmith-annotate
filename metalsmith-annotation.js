'use strict'

var docco = require('docco')
var _ = require('lodash')
var fs = require('fs')
var async = require('async')
var rimraf = require('rimraf')
var path = require('path')

/**
 * Expose `plugin`.
 */

module.exports = createDoc

/**
 * Metalsmith plugin for creating annotation from files.
 *
 * @param {String or Array or Object} opts
 * @return {Function}
 */

function createDoc (opts) {

  var sourceDir = opts.directory
  var tempDir = path.join(__dirname,'docco_temp')

  return function createDoc (files, metalsmith, callback) {

    var absoluteFiles = _.map(Object.keys(files), function (file) {
        return sourceDir + '/' + file
    });

    var config = {
      args: absoluteFiles,
      output: tempDir
    }

    docco.document(config, function (err) {
      if (err) {
        return callback(err)
      }

      var task = []

      Object.keys(files).forEach(function (file) {
        task.push(function (done) {
          fs.readFile(tempDir +'/' + file.split('.')[0] + '.html', function (err, data) {
            if (err) {
              return done(err)
            }
            var html= data.toString('ascii', 0, data.length)
            files[file].html=html.split('<body>')[1].split('</body>')[0]

            done()
          });
        })
      })

      async.parallel(task,function () {
        rimraf(tempDir, function () {
          callback()
        })
      })

    })
  }
}