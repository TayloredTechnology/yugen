// NPM Requires
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('upath')
const root = require('app-root-path')

// Library Requires

// Module Variables
const configPath = path.normalize(root + '/.env.' + process.env.NODE_ENV)

// TODO scanner to check entire MicroService for config.xyz usage ensuring everything maps into the supplied config file
module.exports = () => {
  let doc
  // Get document, or throw exception on error
  try {
    doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'))
  } catch (e) {
    console.log(e);
  }
  return doc
}
