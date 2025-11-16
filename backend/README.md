# Backend – EDU-AGENT Services

The `backend/` directory contains the application services that implement the EDU-AGENT behaviour:

- Agent orchestration and tool-calling,
- RAG retrieval and corpus access,
- Trend data pipelines,
- Charting/reporting endpoints.

This is where most of the Python code will live as the project matures.

---

## Structure

Current layout:

```text
backend/
├── agents/           # Agent logic (planner, tool calls, state management)
├── data_pipeline/    # Trend ingestion, ETL, scheduled jobs
├── pychart_service/  # Charting and report generation service
└── rag_store/        # Vector store and retrieval interface
```
Folders:

- agents/
    - Code that coordinates calls to tools (RAG, trends, report builder),
    - State machine wrappers and orchestration logic,
    - Any agent “policies” (e.g. when to call which tool).

- data_pipeline/
    - Scripts/services to ingest and normalise external trend data,
    - Batch jobs or streaming consumers,
    - Transformation logic that prepares signals for the agent.

- pychart_service/
    - Service that exposes charts/plots (e.g. programme benchmarks) via an API,
    - Uses pychart (or similar) to render graphs for dashboards or reports.

- rag_store/
    - Abstractions over the chosen vector store (e.g. OpenSearch, DynamoDB + embeddings),
    - Functions for indexing documents, updating the corpus and executing retrieval queries.

As the Sprints proceed, these folders will gradually be populated with implementations aligned to the design docs in docs/Sprints/Sprint 1/templates/.

## Development Notes
- Keep modules small and focused; prefer clear separation between:

    - “Domain logic” (e.g. programme comparison, scoring),
    - “Infrastructure glue” (e.g. AWS SDK calls).

Wire up services to infrastructure stacks defined in ../infrastructure/ as the project evolves.

## Next Steps
For Sprint 1:

- Focus on design and interfaces (function signatures, docstrings, module layout) rather than full implementations.
- Derive the agent tool functions and RAG store interfaces from:
    - agent-tools-template.md
    - rag-corpus-design-template.md

Later sprints will fill in the details and wire these to real AWS resources.