# Contributing – EDU-AGENT Student Challenge

This repo is used by multiple student teams (Team A and Team B) working in sprints.
This guide explains how to work in a consistent and safe way.

---

## 1. Branching

- Do **not** commit directly to `main`.
- Create a feature branch per piece of work:

    ```bash
    git checkout -b feature/<team>-<short-description>
    # examples:
    # feature/team-a-poc-charter
    # feature/team-b-agent-tools
    ```
## 2. Issues and User Stories

- Every piece of work should be linked to a GitHub issue.
- Start from existing issues in the Team A / Team B boards or create a new one.

Use:
- `docs/Sprints/Sprint 1/issue-writing-cheatsheet.md` for guidance.
- Labels:
   - team:A / team:B
   - story:US-01 … story:US-05
   - type:backend / type:frontend / type:data / type:docs / type:ux / type:ci

## 3. Commits and Pull Requests
### Commits
- Make small, focused commits.
- Use clear messages, e.g.:
    - feat: add PoC charter draft
    - design: define agent tool JSON contracts
    - docs: add Sprint 1 overview

### Pull Requests

- Open PRs from your feature branch into main (or a designated integration branch).
- In the PR description:
    - Link the related issue(s): Closes #123
    - Summarise what changed and why.
    - Mention any follow-up work.

## 2. Code & Doc Style
- Keep code and docs small and readable.
- Prefer clear names over clever ones.
- For docs:
    - Use headings and bullet lists.
    - Link to other docs instead of duplicating content.

## 5. AWS and Security
- Use AWS SSO profiles only (aws configure sso).
- Do not create IAM access keys or store aws_access_key_id and aws_secret_access_key locally.
- Do not commit:
   - Secrets or credentials,
   - Private URLs or tokens,
   - Real student PII.

**If you accidentally commit something sensitive, notify me immediately.**

## 6. When You’re Blocked
If you are stuck:

1. Comment on your issue:
    - What you tried,
    - What you expected,
    - What you saw instead.
2. Move the issue to a “Blocked” or “Needs Review”.
3. Raise it in the next workshop or office hours.
Learning how to communicate blockers is part of the challenge.