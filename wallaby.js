module.exports = () => {
  return {
    files: [
      'routes/**/*.js',
      '!routes/**/*spec.js',
      'helpers/**/*.js',
      '!helpers/**/*.js',
      'index.js',
      {pattern: '.env*', instrument: false},
      'templates/**/*.js',
      '!templates/**/*spec.js',
      '!templates/nanoservice/*'
    ],
    tests: [
      'routes/**/*spec.js',
      'helpers/**/*spec.js',
      // '!nock/**/*api.spec.js', // actively ignore API tests unless working on them
      'nock/**/*.json',
      'templates/**/*spec.js',
      '!templates/nanoservice/*'
    ],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: '--harmony',
        env: 'NODE_ENV=development'
      }
    },
    setup: function(wallaby) {
      global.reqlib = require('app-root-path').require
      var tf = wallaby.testFramework
      tf.timeout(5000)
      require('dotenv-safe').load()

      // quibble line necessary due to wallabyjs callback stack
      // https://github.com/wallabyjs/public/issues/848
      require('quibble').ignoreCallsFromThisFile(require.main.filename)
    },
    teardown: function(wallaby) {
      require('testdouble').reset()
    }
  }
}
