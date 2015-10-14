'use strict'

var docco = require('docco')

var createDoc = function createDoc (files, outputFolders, callback) {
  var config = {args: files}

  if (!Array.isArray(outputFolders)) {
    outputFolders = [outputFolders]
  }

  outputFolders.forEach(function (outputFolder) {
    config.output = outputFolder
    docco.document(config, callback)
  })
}

module.exports = {
  createDoc: createDoc
}
