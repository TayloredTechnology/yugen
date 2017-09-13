global.reqlib = require('app-root-path').require

// NPM Requires
const _ = require('lodash')

// Library Requires
reqlib('helpers/chai-setup')

// Module Variables
var ns = {}
var scriptName

var checkPublicKeySelf = (script, scriptName, allowedPublicKeys) => {
  if (script.length == 0) {
    it('in ' + process.env.NODE_ENV + ': default: public', () => {
      // Reset cache and force production mode for this single test
      process.env.NODE_ENV = 'production'
      delete require.cache[require.resolve('./' + scriptName)]
      let script = reqlib('server/' + scriptName)
      return (typeof script).should.equal('function')
    })
  } else {
    let nodeEnv = process.env.NODE_ENV
    if (!script['get']) {
      Object.keys(script).forEach((key) => {
        if (nodeEnv === 'development') {
          it('in ' + nodeEnv + ': ' + key + ': public', () => {
            return (typeof script[key]).should.equal('function')
          })
        } else {
          if (key === allowedPublicKeys[_.indexOf(allowedPublicKeys, key)]) {
            it('in ' + nodeEnv + ': ' + key + ': public', () => {
              return (typeof script[key]).should.equal('function')
            })
          } else {
            it('in ' + nodeEnv + ': ' + key + ': private', () => {
              return true
            })
          }
        }
      })
    } else {
      script._router.stack.forEach((routes) => {
        if (routes.route) {
          it('Module exposes route: ' + routes.route.path + ' of type(s): ' + JSON.stringify(routes.route.methods), () => {
            return true
          })
        }
      })
    }
  }
}

ns.checkPublicKeys = (scriptName, allowedPublicKeys) => {
  this.scriptName = scriptName
  describe(scriptName + ': API Endpoints expose correctly in DevTest & Production', () => {

    process.env.NODE_ENV = 'production'
    let script = require(scriptName)

    checkPublicKeySelf(script, scriptName, allowedPublicKeys)

    process.env.NODE_ENV = 'development'
    delete require.cache[require.resolve(scriptName)]
    script = require(scriptName)

    checkPublicKeySelf(script, scriptName, allowedPublicKeys)

    after(() => {
      process.env.NODE_ENV = 'development'
    })
  })
}

module.exports = ns
