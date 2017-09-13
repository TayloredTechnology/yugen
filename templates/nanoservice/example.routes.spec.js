// NPM Requires
const supertest = require('supertest')
const express = require('express')
const td = require('testdouble')
const path = require('upath')

// Library Requires
const chai = reqlib('helpers/chai-setup')

// Module Variables

const pathSplit = path.dirname(path.normalize(__filename)).split('/')
const dirname = '/' + pathSplit[pathSplit.length - 2]
const minSemVer = '/' + pathSplit[pathSplit.length - 1].replace('v', '')

describe(dirname + ' verify NanoService: ' + path.basename(__filename).replace('.routes.spec', ''), function() {
  // TODO add a trackable minimum version semver to import to all files
  const nanoServiceName = path.basename(__filename).replace('.routes.spec.js', '')
  const interaction = ['Mocked', 'Passthrough']
  const isMockedLoop = [true, false]
  // string for version is lowest accepted for code functionality
  const nanoServiceRoute = dirname + minSemVer + '/' + nanoServiceName

  isMockedLoop.forEach(function(isMocked) {
    let app, request, route, nanoService

    beforeEach(function() {
      // Create an express application object
      app = express()

      // Prevent hitting external API's in Unit tests
      require('./helpers/api-nock')()

      if (isMocked) {
        // Setup generic returns for each td function
        nanoService = td.replace('./' + nanoServiceName)
        td.when(nanoService.getUser(td.matchers.anything())).thenReturn(null)

      }

      // Load route after mocking with testdouble the NanoServices
      route = require('./index')

      // Bind our application to
      route(app)

      // Get a supertest instance so we can make requests
      request = supertest(app)
    })

    // Don't need to check '/' as this is already checked in index.routes.spec.js
    it(interaction[isMockedLoop.indexOf(isMocked)] + ': GET /example/ should respond with 200 and a user object', function() {
      if (isMocked) {
        td.when(nanoService.getUser('octocat')).thenReturn({
          mock: true
        })
      } else {
        // Skip test until the mocked function has been coded
        this.skip()
      }

      console.log(nanoServiceRoute)
      return request
        .get(nanoServiceRoute + '/octocat')
        .expect(200)
        .then((res) => {
          res.body.should.be.an('object').and.include({
            mock: true
          })
        })
    })

    afterEach(function() {
      if (isMocked) {
        td.reset()
      }
    })
  })
})
