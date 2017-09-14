'use strict'
global.reqlib = require('app-root-path').require

// NPM Requires
const app = require('express')()
const swagger = require('swagger-spec-express')
const shell = require('shelljs')
const path = require('upath')
const widdershins = require('widdershins')
const fs = require('fs')
// TODO remove dotenv for cloud compatible alternative: autoconfig
require('dotenv-safe').load()

// Library Requires
const packageJson = require('./package.json')
// const swaggerOpts = require('./swagger.json')

swagger.swaggerize(app)

// TODO allow for a single route mapping structure instead of multi i.e.
// routes/vxxx as well as routes/example/vxxx
let matchedAPIs = shell.ls('-d', __dirname + '/routes/*/')
// drop first item as its __dirname

matchedAPIs.forEach((apiBase) => {
  let apiName = path.basename(apiBase)
  let matchedAPIVersions = shell.ls('-d', __dirname + '/routes/' + apiName + '/v**/')
  matchedAPIVersions.forEach((apiPathVer) => {
    if (!shell.test('-f', apiPathVer + 'index.js')) {
      return
    }
    let apiVer = path.basename(apiPathVer)
    // Every api version requires a separate swagger output file
    swagger.initialise(app, {
        title: apiName,
        version: apiVer
    })

    let reqPath = './routes/' + apiName + '/' + apiVer
    app.use(require(reqPath))

    swagger.compile()
    var result = swagger.validate()
    if (!result.valid) {
        console.warn("Compiled Swagger document does not pass validation: " + apiName + ': ' + apiVer + ': ' + result.message)
    }
    let swaggered = swagger.json()
    fs.writeFile(apiPathVer + 'swagger.json', JSON.stringify(swaggered))
    widdershins.convert(swaggered, { codeSamples: false }, (err, str) => {
      let reqPath = './docs/api/' + apiName + '/'
      shell.mkdir('-p', reqPath)

      // Massage the 'shins' format into a more MkDocs friendly one
      str = str.replace(/#/g, '##')
      str = str.split('\n').splice(9).join('\n')
      // str = str.substring(str.indexOf('\n') + 9).join('\n')

      // TODO increase efficiency of string trimming
      // TODO better formatting & readability with MkDocs 'Material' Theme
      fs.writeFile(reqPath + apiVer + '.md', str)
    })
    swagger.reset()

  })
})
