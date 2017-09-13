# Microservices + Functions => NanoServices

There has been a long and progressive technology journey to reach a happy medium of code complexity vs functionality. Where originally systems would use functions / programs to perform tasks and they would be iterated till near perfection.

In contrast service oriented achitecture created complex relationships between functions to describe desired behavior and grew to become monolithic doing everything and shipping much of what was never used.

**Yūgen** is about blending the two approaches into a happy serverless medium, even if your not ready to be serverless yet, the foundation is there to move when the organisation catches up.

## Architecture

To **Yūgen** each project should be a microservice. Specifically designed on performing a specific task. Often this would end up represented as a microservice to interface with another external microservice. But options are unlimited, just keep Service Oriented Architecture in scope at the smallest logical **collection** of components

While at first glance this may seem simple, the reality is that if your using a single external api you may need to do many things, with layers of endpoints, some virtually pass-through, some translation and some quite complex. Technically each type could be a separate microservice, but **Yūgen** simplifies this approach through the following structure

- Routes @ Root Level => functions
- Functions are always versioned via Semver
- Functions are minimum collections of nanoservices required for delivery
- Nanoservices inherit prior versions automatically

All levels are isolated from eachother, and all levels understand how to inherit the other as part of the design.
