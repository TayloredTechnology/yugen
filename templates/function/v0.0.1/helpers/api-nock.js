const nock = require('nock')
const nockPath = require('app-root-path').resolve('nock/')

module.exports = () => {
  nock('https://api.github.com')
    .get('/users/octocat')
    .replyWithFile(200, nockPath + 'response.json')
}
