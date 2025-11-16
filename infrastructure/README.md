# Infrastructure – CDK App for EDU-AGENT

This directory contains the **infrastructure-as-code** for EDU-AGENT, implemented using the AWS Cloud Development Kit (CDK).

The goal is to provide a reproducible way to create the AWS resources needed for the pilot (e.g. VPCs, Lambdas, Step Functions, S3 buckets, vector store, etc.).

---

## Structure

Typical structure:

```text
infrastructure/
├── bin/                 # CDK app entrypoint(s)
├── lib/                 # CDK stacks and constructs
├── assets/
│   └── lambda/          # Lambda function source code packaged by CDK
├── test/                # CDK tests (if used)
├── cdk.json             # CDK configuration
├── package.json         # NPM dependencies for the CDK app
├── tsconfig.json        # TypeScript configuration
└── jest.config.js       # Jest test configuration
```
## Requirements
- Node.js (LTS version)
- NPM
- AWS CLI v2 configured with SSO-based profile (no long-term access keys)
- AWS CDK CLI installed globally:
```bash
npm install -g aws-cdk
```

## Installation
```bash
cd infrastructure
npm install
```

## Common Commands

Note: In early sprints, you may be asked not to deploy, only to run cdk synth or read the stacks. Always check-in before running deploy actions.

From the `infrastructure/` directory:

- Synthesize the CloudFormation templates:
```bash
cdk synth --profile <your-sso-profile>
```
- List stacks:
```bash
cdk list
```
- (When applicable) Deploy a specific stack:
```bash
cdk deploy <StackName> --profile <your-sso-profile>
```

## Relation to the Rest of the Project

The CDK stacks here are responsible for provisioning resources that:
- Backend services in ../backend/ will use (e.g. Lambda functions, Step Functions, SQS/SNS, S3).
- The RAG and trend pipelines depend on (e.g. vector store, data buckets).
- The agent orchestration will run on (e.g. Step Functions state machines or other orchestrators).

As the design stabilises in Sprint 1, we will align:
- RAG store design in docs (rag_store abstraction) with the actual infra resources.
- Agent tool contracts with the infrastructure (which Lambda / API Gateway endpoints implement which tool).

## Safety and Security
- Use SSO profiles only (aws configure sso, aws sso login).
- Do not hard-code secrets in CDK code; use AWS Secrets Manager or SSM Parameter Store where needed (later sprint).

