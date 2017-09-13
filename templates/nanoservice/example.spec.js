// NPM Requires
const request = require('supertest')

// Library Requires
const chai = reqlib('helpers/chai-setup')
const help = reqlib('helpers/helper')

// Module Variables
const scriptName = __filename.replace('.spec', '')
const allowedPublicKeys = [
  'default'
]

// Check that public & private methods are exposed correctly
help.checkPublicKeys(scriptName, allowedPublicKeys)
delete require.cache[require.resolve(scriptName)]
const script = require(scriptName)

// All methods tested from here on are private exposed public for unit testing purposes
describe(scriptName + ': Ensure Methods Operate Correctly', () => {
  beforeEach(() => {
    // Ensure that external API calls only respond with a pre-verified Mock / Nock
    require('./helpers/api-nock')()
  })

  it('default works okay', () => {
    console.log(script.default)
    script.default().should.be.an('object').and.include({
      mock: false
    })
  })

  it('Get a user by username', () => {
    // console.log(script)
    return script.getUser('octocat')
      .then(response => {
        (typeof response).should.equal('object')

        //Test result of name, company and location for the response
        response.name.should.equal('The Octocat')
        response.company.should.equal('GitHub')
        response.location.should.equal('San Francisco')
      })
  })
})
