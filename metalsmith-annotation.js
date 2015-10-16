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
  var workingDir = opts.workingdir
  var tempDir = path.join(workingDir, 'docco_temp')

  return function createDoc (files, metalsmith, callback) {
    var jsfiles = _.remove(Object.keys(files), function (file) {
      return file.indexOf('.js') > 0
    })

    var absoluteFiles = _.map(jsfiles, function (file) {
      return path.join(workingDir, sourceDir + '/' + file)
    })

    var config = {
      args: absoluteFiles,
      output: tempDir
    }

    if (jsfiles.length > 0) {
      docco.document(config, function (err) {
        if (err) {
          return callback(err)
        }

        var task = []

        // reading html file and loading them into files array
        jsfiles.forEach(function (file) {
          task.push(function (done) {
            fs.readFile(tempDir + '/' + path.basename(file, 'js') + 'html', function (err, data) {
              if (err) {
                return done(err)
              }

              // remove old js file entry and create a new one for html file

              var htmlFilename = path.dirname(file) + '/' + path.basename(file, '.js') + '.html'
              var html = data.toString('ascii', 0, data.length)
              files[file].contents = html.split('<body>')[1].split('</body>')[0]
              files[htmlFilename] = files[file]
              delete files[file]

              done()
            })
          })
        })

        async.parallel(task, function () {
          rimraf(tempDir, function () {
            callback()
          })
        })
      })
    }
  }
}
