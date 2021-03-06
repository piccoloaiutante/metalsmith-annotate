# Metalsmith annotate
[![travis][travis-badge]][travis-url]
[![git][git-badge]][git-url]
[![npm][npm-badge]][npm-url]
[![standard][standard-badge]][standard-url]
[![nearform][nearform-badge]][nearform-url]

Metalsmith Annotate is a MetalSmith plugin for creating html files from code annotation. It is based on [docco](https://www.npmjs.com/package/docco) library and it has been designed to parse only js files.


## Installation
To install Metalsmith Annotate, simply use npm:

```
npm install metalsmith-annotate --save
```
## Usage
You can see an example of usage in [test](./test/index.test.js) folder. Metalsmith Annotate has two params that needs to be passed:
* _directory_: is a string containing the _relative_ path where docco need to look for js source code files that need to be parsed
* _workingdir_: is a tring containing the _absolute_ path where docco can create a temporary folder for parsed files

```javascript
'use strict'

var metalsmith = require('metalsmith'),
    annotate = require('metalsmith-annotate')

// directory param is where docco needs to look for js source file. 
// workingdir param is where the module is going to create temp folder for html files.
metalsmith.use(annotate({
      directory: '',
      workingdir: __dirname
    }))
```

## License

Copyright Michele Capra 2015, Licensed under [MIT](./LICENSE)

[travis-badge]: https://travis-ci.org/piccoloaiutante/metalsmith-annotate.svg?branch=master
[travis-url]: https://travis-ci.org/piccoloaiutante/metalsmith-annotate
[git-badge]: https://img.shields.io/github/release/piccoloaiutante/metalsmith-annotate.svg?style=flat-square
[git-url]: https://github.com/piccoloaiutante/metalsmith-annotate/releases
[npm-badge]: https://img.shields.io/npm/v/metalsmith-annotate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/metalsmith-annotate
[standard-badge]: https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square
[standard-url]: https://npmjs.org/package/standard
[nearform-badge]: https://img.shields.io/badge/sponsored%20by-nearForm-red.svg?style=flat-square
[nearform-url]: http://nearform.com

