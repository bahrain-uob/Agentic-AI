# Issue Writing Cheat Sheet

## 1. Good Issue Title

- Short and action-oriented:
  - `feat: implement /ask endpoint stub`
  - `design: agent tool inventory`
  - `docs: Sprint 1 PoC charter`

Avoid vague titles like "backend stuff" or "fix things".

## 2. Description

Answer:
- **What** needs to be done?
- **Why** does it matter?

Example:

> Implement a stubbed `/ask` endpoint that accepts a question and returns a placeholder answer. This gives the frontend a stable API to integrate against in Sprint 1.

## 3. Acceptance Criteria

Write 2–5 clear bullet points. Each must be testable.

Example:

- [ ] Endpoint `/ask` accepts POST with `{ "question": "..." }`
- [ ] Returns `200` with JSON containing `answer` field (placeholder text)
- [ ] Basic error path returns `4xx/5xx` with `error.message`
- [ ] README updated with example request/response

## 4. Labels & Links

- Add labels:
  - `team:A` or `team:B`
  - `story:US-01` – `story:US-05`
  - `type:backend`, `type:frontend`, `type:docs`, etc.
- Link to:
  - Relevant docs (e.g. templates, workshop notes)
  - Parent user story

## 5. Comments

Use comments to:

- Ask for clarification
- Record small design decisions
- Share links or references

A comment like:

> “Assumption: for Sprint 1, this endpoint will **not** call a real model yet, just return placeholder text” 

…is extremely helpful later.
