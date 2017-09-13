// NPM Requires
const express = require('express')
const setVersion = require('express-request-version').setByPath

// Library Requires

// Module Variables

module.exports = function(app) {
  app.use(setVersion('/'))
}

// identify the version of the api that we're trying to hit
// TODO enable multiple recognition functionality for all routes
// https://www.npmjs.com/package/express-request-version
