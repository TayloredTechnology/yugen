# Yūgen (幽玄)

A foundation for building auto-documenting & testable cloud agnostic microservices in a serverless environment

## Purpose

We are suffering from a rapid adoption loss of quality movement, where fundamental shifts in approaches to developing software are starting to occur. The mantra of monolithic services or tightly coupled services is fading away and being replaced by often (multiple) microservices to achieve the same task at a fraction of the cost.

Many of these are open source, and the number of endpoints that any microservice needs to integrate, verify and keep current with these days is rapidly becoming staggering, and the traditional approach of unit / integration / end to end testing is unable to keep up with this new landscape.

>**Yūgen** is a foundational approach to keep up with this shifting landscape by providing a methodology for developing serverless functions to create highly integratible microservices with a strong focuses on future driven best practices.

## Features

- Logically grouped microservices can be developed and maintained in a centralized repository, or split into sub-paths allowing development of serverless functions that worktogether as a unified microservice
- Each endpoint is automatically tested as a real point and mocked allowing focus on developing API structure and MVP solutions while backfilling code.
- External API's are managed and watched for breaking changes with every build
- External API's / microservices that publish OpenAPI standard documentation are automatically kept in sync via subscriptions
- OpenAPI / Swagger documentation is automatically generated for all applications built on this foundation
- Can be deployed into any cloud, Google Cloud Functions, AWS Lambda, Azure & integrates with Serverless framework (if so inclined)
- Automatic versioning of API accepting any of the normal approaches to accessing different versions, Header, Direct URL etc.
- Adapts to incorrect versioning requests by serving the latest stable lower version than request.

## Installation & Usage
