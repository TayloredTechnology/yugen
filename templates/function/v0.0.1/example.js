// NPM Requires
const axios = require('axios')

// Library Requires

// Module Variables

var ns = {}

ns.getUser = (username) => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(res => res.data)
    .catch(error => console.log(error))
}

ns.default = (req, res) => {
  // TODO We haven't implemented this yet, but it won't impede testing progress
  return {
    mock: false
  }
}


// When in development mode remove all black-box functionality to allow unit testing of private functions
if (process.env.NODE_ENV === 'development') {
  module.exports = ns
} else {
  module.exports = ns['default', 'getUser']
}
