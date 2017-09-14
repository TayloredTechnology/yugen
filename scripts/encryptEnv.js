'use strict'

// NPM Requires
var Prompt = require('prompt-password')
const crypt = require('cryptorjs')
const shell = require('shelljs')
const path = require('upath')

// Library Requires

// Module Variables
let pathSplit = path.dirname(path.normalize(__filename)).split('/')
pathSplit.pop()
const configPath = pathSplit.join('/') + '/.env.' + process.env.NODE_ENV
let cryptor

var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password please',
  name: 'password'
})

// Automatically decrypt when installed in production
prompt.run()
.then(function(answers) {
  cryptor = new crypt(answers.toString())
  let cryptString = cryptor.encode(shell.cat(configPath))
  shell.ShellString(cryptString).to(configPath + '.enc')
})
