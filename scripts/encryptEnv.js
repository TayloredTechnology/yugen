var Prompt = require('prompt-password')
const shell = require('shelljs')
var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password please',
  name: 'password'
})

prompt.run()
  .then(function(answers) {
    shell.exec('npx dotenvenc -e ' + answers.toString())
  })
