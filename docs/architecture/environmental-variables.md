# Environmental Variables

## 12 Factor Influence

… on applications is complex, as applications could be a Microservice, or collection of Microservices. In Yugen's architecture, a single **MicroService** contains one or many **Functions** with each Function containing one or many **NanoServices**.

Each NanoService, may or may not integrate with external API's or other Functions & MicroServices and for security each service should only be able to communicate with another when authenticated. But each environment should have different authentication credentials as well.

- Its a challenge to keep track of everything.
- 12 Factor specifies that configuration should be passed in via environmental variables to keep it from the codebase and accidental overlapping of authentication environents.

So where would authentication actually live? Even pushed in via Environmental Variables it has to be kept somewhere, and managed in a scale that grows with each MicroService deployed.

##  Transcrypt's Approach

There's an awesome GitHub project: https://github.com/elasticdog/transcrypt that provides a robust and battle tested solution for Server based applications that have access to the underlying operating system.

Effectively, we encrypt files with a cyper that is only able to be decrypted by those with access, including the production & development systems. Its virturally seamless as they hook into Git and the encrypted files are stored in the repository.

## Yugen's Approach

In the pure serverless world, items such as Environmental Variables are luxuries as serverless is about running your code, and your code should be complete with no external dependencies in all sense of the term. Its not a violation of 12 Factor, but the logical evolution of the base spec and approach.

Yugen uses YAML format files, appropriately named after the normal *NODE* environments

- .env.production
- .env.development
- TODO .env.local

Each of these have a matching .enc which represents their encrypted version. Each of them has a unique encryption key that can be recognised by the deployment environment. Some unique identifier that is recognisable by your application and consistent by environment for the serverless host your using.

Its also possible to just use *.env* for local development. This file won't be persisted into Git, and production environments should use the YAML instead

### Verification of Environmental Variables

Its not enough to utilise a mechanism for safely storing secrets packaged with the application. Its a necessity to ensure that all required varaibles are provided for the respective environment. Yugen leverages on the *dovenv* ecosystem to assist with this.

A file *.env.example* is included which should contain the names of all the necessary environment variables for your MicroService to run.

On starting your MicroService variables from the YAML for the respective environment are written to *.env* then *dotenv-safe* is used to parse and verify that *.env* contains all the required variables, even if the serverless platform won't allow you to set them.

Internally the YAML is used for providing variable access throughout Yugen. This is just a check, and can assist in Local Development to see what's going on.

### YAML File Structure

… follows the *autoconfig* methodology https://www.npmjs.com/package/autoconfig

```
env:
  NODE_ENV: development,
  DATABASE_URL: 'postgresql://localhost/test?client_encoding=utf8'
other:
  DATABASE_URL: 'postgresql://otherhose/test?client_encoding=utf8'
```

Anything exposed under 'env' will be ported to the .env file everything else is a secret. So Environmental Settings & Secrets are stored & Encrypted together
