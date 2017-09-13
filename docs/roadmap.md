## Roadmap

### 1.0

*Application Functionality*

- [x] S6 Manager for processes
- [x] Kubernetes @1.6.x functionality release
- [x] Application specifications in YAML, API interactions in JSON for lowest common denominator compatibility
- [x] Automatic configuration of Kube-System
- [x] Detection & configuration of LDAP for tectonic
- [x] CONFD templating engine for initial templates
- [x] Root installation in 'kube-system'
- [x] Single 'conductor.yaml' configuration file for all apps & namespaces
- [x] deployment of namespace specific secrets (such as application configuration files) from Kube-System into namespace
- [x] Instruct Kubernetes to automatically re-deploy of applications on private repositories by tag (using poll) i.e. 'latest'
- [x] PUT / replace deployed applications & settings when updates occur to 'conductor.yaml' automatically
- [x] When deploying to a Namespace, ensure only information pertenant to that namespace is deployed
- [x] Generate all template files in a 'DRY_RUN' without publishing

*YAML API*

- [x] Initial Stable API
- [x] Clear 'Mandatory' requirements (see conductor-simple-minimal.yaml)
- [x] Full configuration options (see conductor-simple.yaml)
- [x] Application deployment by group
- [x] Generic deployment environment type approach: dev (non-ha) -> ha -> perf -> prod {canary & stable}
- [x] environmental overrides
- [x] Namespace settings
- [x] apps running @ cluster level settings
- [x] environmental variable specification

### 1.1.x

*Application Functionality*

- [ ] Environmental variables can override higher levels
- [ ] OmitFromDeploy respected for namespace & app group levels
- [ ] Dependency tree respected for 'group' and 'app' levels
- [ ] Enable 'Istio' Layer 7 LoadBalancer
- [ ] enableProfiler specified @Namespace & overridden @App level.
- [ ] Allow for combined template files to be submitted with duplicate endpoint types (current behaviour is one endpoint type per template)

*YAML API*

- [ ] enableProfiler able to select profiling suite i.e. NewRelic / Sematext

### 1.2.x

WebHooks needed to be pushed out to this release due to challenges in layers curl through a webhook / inotify trigger in multiple layers of BASH + S6

*Application Functionality*

- [ ] Refactor from BASH to Nodejs
- [ ] Refactor templates from CONFD (GoLang extraction) to Nunjucks with Jinja2 compatibility.
- [ ] Template 'Sanity' checks prior to API interaction. An extension of 'DRY_RUN' functionality as part of build & package process
- [ ] WebHooks to Create namespaces based on 'root' level templates
- [ ] WebHook to tear-down namespace
- [ ] Enable execuction as 'non-root' process

### 1.3.x

*Application Functionality*

- [ ] Tricle changes downwards by default. i.e. 'Global conductor.yaml' -> 'Namespace conductor.yaml' merge with priority based on latest.
- [ ] Port 'SaltStack' template upgrades for maximum compatibility with existing infrastructure teams
- [ ] Extend App configuration to repository level through minimal 'conductor.yaml' files
- [ ] Transcrypt enabled for secret management @ repository level. Encryption secrets shared @ app group level

### 1.4.x

*Application Functionality*

- [ ] External service notifications i.e. NewRelic deployment hooks, Slack notification

### 1.5.x

*Application Functionality*

- [ ] Feature branch tracking
- [ ] Branch to environment mapping
- [ ] CI / CD extrapoliation. Automatic namespace creation via WebHooks when 'Feature Branch' is created. Automatic tear-down when last reference to branch is destroyed.

## Future

- [ ] Automatic template migration between Orchestration technologies
- [ ] DockerCompose intelligence
- [ ] Kontena intelligence
- [ ] Spinnaker intelligence
- [ ] Mesos intelligence
