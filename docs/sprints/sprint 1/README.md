# Sprint 1 – Design & Scaffolding

Sprint 1 is the first **student implementation sprint**. The focus is on design and scaffolding rather than full production code.

The key goals are to:

- Clarify and document:
  - A one-page **PoC charter** and **success KPIs**.
  - The **agent tools** we will need and their JSON input/output contracts.
  - The initial **knowledge corpus** and how RAG will access it (sources, metadata, vector store options).
  - The **student-facing Q&A experience** (user journey and early UI/UX).
- Establish:
  - A clean **repository structure**.
  - Lightweight **GitHub workflows** and basic **CI checks**.
  - A working **AWS CLI SSO setup** for each student.

---

## Contents

Typical contents of this folder:

- `Sprint 1 Overview` (e.g. `sprint-1-overview.md` in `templates/`)  
  High-level description of Sprint 1 goals and definition of done.

- `Issue Assignments.md`  
  Matrix mapping each student to their primary Week 1 issues, aligned with their skills and stretch goals.

- `Workshop Notes.md` (or similar)  
  Detailed explanation of:
    _To be added later_

- `issue-writing-cheatsheet.md`  
  Short guide on writing good issues and acceptance criteria.

- `templates/`  
  - `sprint-1-overview.md`  
  - `poc-charter-template.md`  
  - `agent-tools-template.md`  
  - `rag-corpus-design-template.md`  
  - `student-qa-journey-template.md`  

These templates are intended to be **copied and filled in** for Sprint 1 tasks.

---

## How to Work in Sprint 1

1. **Read the Sprint 1 overview** and Workshop notes in sprint 0 to understand the concepts (RAG, agents, workflows).
2. **Check `Issue Assignments.md`** to find your primary issue(s).
3. Use the templates in `templates/` to create:
   - PoC charter and KPIs (US-01),
   - Agent tool definitions and JSON contracts (US-02),
   - RAG corpus and metadata design (US-03),
   - Student Q&A journey and UI sketches (US-04).
4. Update your team’s GitHub Project board:
   - Move your issue to **“In Progress”** when you start,
   - Comment with questions, assumptions and decisions,
   - Move to **“Done”** when acceptance criteria are met.

Remember: Sprint 1 is about **building a solid foundation** – clear docs and design decisions now will make later implementation sprints much easier.
