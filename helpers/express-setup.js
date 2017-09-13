// NPM Requires
const express = require('express')
const app = express()

// Library Requires

// Module Variables

var port = 0

if (process.env.HEADLESS) {
  port = 8080
}

if(!module.parent){ app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})}

module.exports = app
