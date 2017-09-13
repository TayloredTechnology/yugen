// NPM Requires
const axios = require('axios')
const shell = require('shelljs')
const path = require('path')
const _ = require('lodash')
require('dotenv-safe').load()

// Library Requires
reqlib('helpers/chai-setup')

// Module Variables
const nockPath = require('app-root-path').resolve('nock/')
const apiValidation = require(nockPath + 'io.clubhouse.api/enabledProperties.json')

// const endPointTypes = ['get', 'put', 'post', 'delete']
endPointTypes = ['get']

let matchedAPIs = shell.ls('-d', __dirname + '/**/')
// drop first item as its __dirname
matchedAPIs.shift()

var interactAPI = (path) => {
  return axios.get(path)
    .then(res => res.data)
    .catch(error => console.log(error))
}

// iterate through each available API this microservice interacts with
matchedAPIs.forEach((api) => {

  let envAPI = path.basename(api).toUpperCase().replace(/\./g, '_')
  axios.defaults.baseURL = process.env['API_' + envAPI]
  axios.defaults.params = {
    token: process.env['TOKEN_' + envAPI]
  }

  // iterate through each REST API interaction type that's enabled
  // TODO types other than GET
  endPointTypes.forEach((type) => {
    let matchedEndPoints = shell.ls('-R', matchedAPIs).filter((file) => {
      return file.match(type + '\.json$')
    })

    describe('verifying REST type of ' + type, () => {

      matchedEndPoints.forEach((endPoint) => {

        describe('verifying structure of endPoint: ' + endPoint, () => {
          let stripSearch, data, apiStructure

          // Force resolution of promise before advancing to tests
          before((done) => {
            stripSearch = endPoint.replace('.' + type + '.json', '').replace('.', '/')
            data = interactAPI(stripSearch)
              .then((res) => {
                data = res
                done()
              })
          })

          beforeEach(() => {
            apiStructure = apiValidation[stripSearch]
          })

          it('verifying all required fields exist', () => {
            apiStructure.forEach((name) => {
              // it(`has property ${name}`, () => {
              data[0].should.have.property(name)
              // })
            })
          })
        })
      })
    })
  })
})
