// NPM Requires
const supertest = require('supertest')
const express = require('express')
const td = require('testdouble')
const path = require('upath')
const shell = require('shelljs')

// Library Requires
const chai = reqlib('helpers/chai-setup')

// Module Variables

const dirname = '/' + path.dirname(path.normalize(__filename)).split('/').pop()

describe('GET /ping', function() {
  const interaction = ['Mocked', 'Passthrough']
  const isMockedLoop = [true, false]
  const apiVersion = dirname + '/1.0.0'

  isMockedLoop.forEach(function(isMocked) {
    let app, request, route, users, usersTD

    beforeEach(function() {
      // Create an express application object
      app = express()

      // Get our router module, with a stubbed out users dependency
      // we stub this out so we can control the results returned by
      // the users module to ensure we execute all paths in our code

      if (isMocked) {
        // routeDefault = td.replace('./v1.0.x')

        // Setup generic returns for each td function
        // td.when(users(td.matchers.anything())).thenReturn()
      }

      route = require('./v0.0.1')
      // route = reqlib('routes/example/user-route')

      // Bind our application to
      route(app)

      // Get a supertest instance so we can make requests
      request = supertest(app)
    })

    it(interaction[isMockedLoop.indexOf(isMocked)] + ': / should respond with swagger.json document', function() {
      if (isMocked) {
        // td.when(usersTD('nodejs')).thenReturn({
        //   username: 'test'
        // })
        this.skip()
      } else {
        // Skip test until the mocked function has been coded
        // this.skip()
      }

      return request
        .get(apiVersion + '/')
        .expect(200)
        .then((res) => {
        })
    })

    afterEach(function() {
      if (isMocked) {
        td.reset()
      }
    })
  })
})
