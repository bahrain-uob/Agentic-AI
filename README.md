# CIC Innovation Center - EDU-AGENT – Agentic AI PoC

# EDU-AGENT – Agentic AI for Programme Analysis & Campaigns

EDU-AGENT is an agentic AI pilot for the University of Bahrain (UoB) that:

- Compresses **programme analysis and review cycles** (months → weeks),
- Benchmarks programmes against **local, regional, and international** comparators,
- Generates **evidence- and standards-aligned narratives** (BQA, ACM, credit mix),
- Supports **student-facing Q&A and guided campaigns** for recruitment and retention.

The project is implemented on AWS using Amazon Bedrock and related services, and is being built as a student challenge in sprints.

---

## Repository Layout

High-level structure:

```text
.
├── README.md                 # This file
├── CONTRIBUTING.md           # How students to work in this repo
├── docs/                     # Design, workshop notes, sprint docs
├── backend/                  # Application services (agents, RAG, pipelines, charts)
├── infrastructure/           # CDK app and Lambda assets (infra scaffolding)
└── .github/                  # (optional) GitHub workflows
```

See the READMEs inside each directory for more detail.

## Prerequisites 

Before getting started, ensure you have the following installed:

AWS CLI: Follow the installation guide here: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html 

## 🚀 Getting Started
Follow these steps to set up and deploy the project:

#### 📥 Clone the Repository
Clone this repository into your local environment. 

#### 📄 Read the docs overview
Start with:
- `docs/README.md` – how the documentation is organised.
- `docs/Sprints/Sprint 0/README.md` – challenge context and framing.
- `docs/Sprints/Sprint 1/README.md` – current sprint goals and key documents.

#### 🗝️ Set up your AWS CLI (SSO, temporary credentials only)

We only use AWS SSO (IAM Identity Center) with short-lived, temporary credentials. Follow the SSO link you received by email to log in to the AWS access portal.

1. In your terminal, run:

```bash
aws configure sso
```
2. Use the Start URL and SSO region provided for the challenge.
3. Log in via browser when prompted.
4. Choose your student account and role, then give your profile a name, e.g. uob-student.
Later, to refresh credentials:

```bash
aws sso login --profile uob-student
aws sts get-caller-identity --profile uob-student
```
> Do not create or store long-term aws_access_key_id / aws_secret_access_key values for this project. SSO-based profiles only.

More detailed instructions are in the Workshop notes under `docs/Sprints/Sprint 1`.

#### ✨ Find your Sprint 1 tasks
1. Go to docs/Sprints/Sprint 1/Issue Assignments.md to see your primary Week 1 issue(s).
2. Open your team’s GitHub Project board (Team A or Team B) and locate your assigned issues.
3. Move your issue to “In Progress” when you start working on it.

## ✒️ Contributing
See `CONTRIBUTING.md` for:

- Branch naming conventions,
- How to write issues and acceptance criteria,
- How to link your work to user stories and sprints.

## 📈 Status
- Sprint 0: Completed – framing, challenge definitions, initial architecture.
- Sprint 1: In progress – design and scaffolding (charter, tools, RAG design, UX slice, repo/CI).

#### 📌 Install AWS CDK globally
```bash
npm install -g aws-cdk
```

#### 📌 Install AWS CDK library
```bash
npm install aws-cdk-lib
```

#### 🛠 Fix any security vulnerabilities
```bash
npm audit fix
```

#### 📂 Navigate to the frontend directory
```bash
cd frontend
```

#### 📌 Install frontend dependencies
```bash
npm install
```
```bash
npm install web-vitals
```
```bash
npm audit fix --force
```
```bash
npm install react-scripts --save-dev
```
```bash
npm run build
```

#### 🔙 Navigate to the infrastructure directory

```bash
cd ../infrastrucutre
```

#### 🚀 Deploy the CDK application
```bash
cdk deploy --all
```

#### ⚠️ Notes for development 

Ensure you are authenticated with AWS before running cdk deploy.

If you encounter permission errors, check your AWS IAM roles or NCSC boundaries/policies.

  **After successful initial deployment:**
  1. Copy your API Endpoint URL from your API stack deployment outputs
  2. Go to ```frontend > src > app.js```
  3. Replace YOUR_API_GATEWAY_URL, line 8 with your own API endpoint
  4. Build the React App:```npm run build```
  6. Sync the Build Files to S3:```aws s3 sync build/ s3://your-bucket-name --delete```
  7. **if needed** Invalidate CloudFront Cache:```aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"```









