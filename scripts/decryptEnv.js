// NPM Requires
var Prompt = require('prompt-password')
const crypt = require('cryptorjs')
const shell = require('shelljs')
const root = require('app-root-path')
const path = require('upath')

// Library Requires

// Module Variables
let pathSplit = path.dirname(path.normalize(__filename)).split('/')
pathSplit.pop()
const configPath = pathSplit.join('/') + '/.env.'
let cryptor

var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password please',
  name: 'password'
})

var decrypt = (env) => {
  let cryptString = cryptor.decode(shell.cat(configPath + env + '.enc').toString())
  shell.ShellString(cryptString).to(configPath + env)
}

// Automatically decrypt when installed in production
if (process.env.GCLOUD_PROJECT) {
  cryptor = new crypt(process.env.GCLOUD_PROJECT)
  decrypt('production')
} else {
  prompt.run()
  .then(function(answers) {
    cryptor = new crypt(answers.toString())
    decrypt('development')
  })
}
