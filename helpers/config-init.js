// NPM Requires
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('upath')
const root = require('app-root-path')
const shell = require('shelljs')
const _ = require('lodash')

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

  if (doc.env) {
    let fileName = root + '/.env'
    let envars = _.toPairs(doc.env)

    shell.rm('-rf', fileName)

    envars.forEach((envar) => {
      shell.ShellString(envar[0] + '=' + envar[1] + '\n').toEnd(fileName)
    })
  }
  return doc
}
