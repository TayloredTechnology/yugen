# Using Yūgen

## New MicroService

TODO upgrade to Nunjucks generator

Remember a MicroService is the collection of Functions & NanoServices necessary for executing your specific business task / integration / requirement within a Cloud / Serverless scope.

## New Function

Functions are designed to be deployed as 'Cloud / Serverless' Functions. As such they have their own routes and would be installed into the Serverless environment via their directory name.

TODO If you just wanted to deploy then entire stack, add the ENV FULL_STACK=true and all routes would combined to serve from the root index.js

### Creating

Duplicate the example directory into one that would be the name of your Function. *Names are important*: all routes would be based off this directory name so make sure its url safe

## New Version

TODO add generator
When wanting to create a new version of the stack, create a new directory following **SemVer** principles and starting with 'v' *Important*: the directory must start with v to be recognised as a new version

Additionally edit `{Your Function}/index.js` and add the version requests that should map to this newly created version

```
route.use('/', routesVersioning({
  "1.0.0": require('./v1.0.x')(route),
  "~2.2.1": require('./v2.2.1')(route)
  }
}))
```

### New NanoService

Duplicate example.js & example.spec.js into the name of your NanoService endpoint. Setup the tests and describe its functionality. Its perfectly safe to develop in isolation as until the file is added to index.js in the version these NanoServices won't be available for consumption.

Its suggested that each nanoservice should have its own file. A NanoService is the smallest unit that can be versioned, as such all routes for the nano service are still controlled by the respective index.js in the version file.

You will have noticed that the new version's index.js consumes the immediately prior version's index.js all the way to the beginning of SemVer time. This is a deliberate architecture decision to de-couple risks of omitting endpoints in API's by mistake, and providing a safe depreciation approach.

So each new version, only adds the changes to the API, but OpenApi / Swagger documentation is generated in complete for the version.
