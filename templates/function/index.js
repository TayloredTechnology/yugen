// NPM Requires
const express = require('express')
const routesVersioning = require('express-routes-versioning')()
const path = require('upath')

// Library Requires
const users = require('./users')
// const users = reqlib('routes/example/users')

// Module Variables

const dirname = '/' + path.dirname(path.normalize(__filename)).split('/').pop()
const githubMiddleware = require('github-webhook-middleware')({
  secret: 'itStarts',
  limit: '1mb', // <-- optionally include the webhook json payload size limit, useful if you have large merge commits.  Default is '100kb'
})

module.exports = function(app) {
  var route = express.Router({
    mergeParams: true
  })

  app.use(dirname + '/:semver', githubMiddleware, route)

  // semver is inherited from parent app intercepter route
  route.use('/', routesVersioning({
    "~0.0.1": require('./v0.0.1')(route),
    // Suggest always having the last as revolve to major
    "^0.0.2": require('./v0.0.2')(route)
  }))
}
