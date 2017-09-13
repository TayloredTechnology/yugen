// NPM Requires
const express = require('express')
const swagger = require('swagger-spec-express')
const shell = require('shelljs')
const path = require('upath')
var route = require('express').Router()

// Library Requires
const example = require('./example')

// Module Variables
var ns = {}
var dirname = path.dirname(path.normalize(__filename)).split('/')
// specifically selecting the parent routing instead of the version for preappend
// this ensures that all documentation can be drilled down to API version number
dirname = '/' + dirname[dirname.length - 2]

swagger.swaggerize(route)

ns.appRoutes = () => {
  let routeVer = ''

  if (process.env.SWAGGER) {
    routeVer = dirname
  } else {
    routeVer = ''
  }

  // TODO when advancing by version erase / override an existing route via
  // importing the last route by semver compare

  // semver & path are inherited from parent app intercepter route
  // base route should always return a swagger.json document (for public endpoint discovery)
  route.get(routeVer + '/', (req, res) => {
      // res.status(200).send(shell.cat(__dirname + 'swagger.json'))
      res.status(200).send('swagger.json')
    })
    .describe({
      responses: {
        200: {
          description: "Returns the swagger.json document"
        },
        404: {
          description: "Failed to return swagger.json document"
        }
      }
    })

    ns.exampleRoutes(routeVer)

  return route
}

// For easier searching split NanoServices out from Function Logic
// This must be in the same file to ensure that SemVer gets generated correctly
ns.exampleRoutes = (routeVer) => {
  let nano = routeVer + '/example'
  route.get(nano + '/', (req, res) => {
      // controllers should be passed values and return responses
      let output = example.default(req)
      // An object response must be recieved from the route for mocks to work
      res.status(200).send(output)
    })
    .describe({
      responses: {
        200: {
          description: "Example Success"
        },
        404: {
          description: "Example Failure"
        }
      }
    })

    route.get(nano + '/:usr', (req, res) => {
      // controllers should be passed values and return responses
      let output = example.getUser(req.params.usr)
      // An object response must be recieved from the route for mocks to work
      res.status(200).send(output)
    })
}

ns.isolation = (app) => {
  route = express.Router({
    mergeParams: true
  })
  swagger.swaggerize(route)

  if (process.env.NODE_ENV === 'development') {
    app.use(dirname + '/:semver', route)
  }

  // Mount the Routes for this Router
  ns.appRoutes()
}

if (process.env.SWAGGER) {
  module.exports = ns.appRoutes()
} else {
  module.exports = ns.isolation
}
