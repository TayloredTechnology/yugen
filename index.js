'use strict'
global.reqlib = require('app-root-path').require

// NPM Requires
const app = require('express')()
// TODO remove dotenv for cloud compatible alternative: autoconfig
require('dotenv-safe').load()

// Library Requires

// Module Variables
const PROJECT_ID = process.env.GCLOUD_PROJECT

// Have user route mount itself to the express application, we could pass
// other parameters too, such as middleware, or the mount path
require('./helpers/semver')(app)
require('./routes/example')(app)

exports.app = app
