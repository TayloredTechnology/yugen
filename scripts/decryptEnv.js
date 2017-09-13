var Prompt = require('prompt-password')
var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password please',
  name: 'password'
})

// Automatically decrypt when installed in production
if (process.env.GCLOUD_PROJECT) {
  require('dotenvenc')(process.env.GCLOUD_PROJECT)
} else {
  prompt.run()
  .then(function(answers) {
    require('dotenvenc')(answers.toString())
  })
}
