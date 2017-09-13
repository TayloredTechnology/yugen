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

describe(dirname + ' verify base NanoServices work as expected', function() {
  const interaction = ['Mocked', 'Passthrough']
  const isMockedLoop = [true, false]
  // string for version is lowest accepted for code functionality
  const apiVersion = dirname + minSemVer

  isMockedLoop.forEach(function(isMocked) {
    let app, request, route
    // NanoServices
    let example

    beforeEach(function() {
      // Create an express application object
      app = express()

      if (isMocked) {
        // Setup generic returns for each td function
        example = td.replace('./example')
        // td.when(example.default(td.matchers.anything())).thenReturn(null)

      }

      // Load route after mocking with testdouble the NanoServices
      route = require('./index')

      // Bind our application to
      route(app)

      // Get a supertest instance so we can make requests
      request = supertest(app)
    })

    it(interaction[isMockedLoop.indexOf(isMocked)] + ': GET / should respond with swagger.json document', function() {
      return request
        .get(apiVersion + '/')
        .expect(200)
        .then((res) => {
          // TODO check that a swagger file has been returned
        })
    })

    it(interaction[isMockedLoop.indexOf(isMocked)] + ': POST /example/ should respond with 200 and a user object', function() {
      if (isMocked) {
        td.when(example.default(td.matchers.anything())).thenReturn({
          mock: true
        })
      } else {
        // Skip test until the mocked function has been coded
        this.skip()
      }

      return request
        .get(apiVersion + '/example/')
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
