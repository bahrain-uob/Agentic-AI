# Documentation – EDU-AGENT

This folder contains all design documents, workshop notes, sprint artefacts and templates.

We organise docs primarily by **sprint**.

---

## Structure

```text
docs/
├── Assets/                # Images and diagrams used in docs
└── Sprints/
    ├── Sprint 0/          # Framing, challenge briefs, early workshops
    └── Sprint 1/          # Current sprint docs, templates, assignments
```

## Where to Start

If you are new to the project:
    1. Read Sprints/Sprint 0/README.md for context on the EDU-AGENT pilot and challenge framing.
    2. Read Sprints/Sprint 1/README.md to understand the current sprint’s goals and your responsibilities.

Use the templates under Sprints/Sprint 1/templates/ when creating new docs for:
- PoC charter and KPIs,
- Agent tools and JSON contracts,
- RAG corpus and metadata design,
- Student Q&A journey and UI sketches,
- Sprint overview and definition of done.

### Assets
Place all diagrams / images under docs/assets/.
Reference them from markdown using standard markdown syntax, for example:
```markdown
![EDU-AGENT Architecture](../Assets/edu-agent-architecture.jpg)
```

### Sprints
- Sprints/Sprint 0/ – contains:
    - Solution workshop prep,
    - Team challenge briefs,
    - Early workshop notes.

- Sprints/Sprint 1/ – contains:

    - Sprint 1 overview and goals,
    - Issue assignment matrix,
    - Workshop notes,
    - Templates for design and documentation tasks.
See the README files inside each sprint folder for details.