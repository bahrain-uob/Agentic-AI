# Agent Tool Inventory & JSON Contracts
**Note**: This document should serve as a guide for how your end Charter doc will look, use whatever process you see fit to create, monitor and update the document.

## 1. Overview

This document lists the tools our agent can call, and defines their
input/output JSON formats.

---

## 2. Tool Inventory

For each tool, describe:

| Tool Name         | Purpose                                  | Who calls it? (Agent/FE/Other) | Dependencies                 |
|-------------------|------------------------------------------|---------------------------------|------------------------------|
| `rag_retriever`   | Retrieve relevant programme docs         | Agent                           | Vector store, corpus         |
| `trend_fetcher`   | Pull latest market/trend data            | Agent                           | Trend data store / API       |
| `report_builder`  | Assemble a narrative report              | Agent                           | RAG outputs, analytics data  |
| …                 |                                          |                                 |                              |

---

## 3. Tool JSON Contracts

### 3.1 `rag_retriever`

**Description:**  
Given a natural language query and optional filters, returns relevant document snippets.

**Input JSON:**
```json
{
  "query": "string",
  "top_k": 5,
  "filters": {
    "program_code": "CS-Cloud",
    "year": "2024"
  }
}
```

**Output JSON:**
```json
{
  "results": [
    {
      "doc_id": "string",
      "source": "catalogue_2024.pdf",
      "score": 0.87,
      "snippet": "string",
      "metadata": {
        "program_code": "CS-Cloud",
        "year": "2024",
        "section": "Admission Requirements"
      }
    }
  ]
}
```

**Error JSON**
```json
{
  "error": {
    "code": "RETRIEVER_TIMEOUT",
    "message": "Timed out after 5 seconds"
  }
}
```

Repeat similar sections for:
- trend_fetcher
- report_builder
- any other tools you design in Sprint 1.\

4. Security & Guardrails Notes - I have done these for you

## 4. Security & Guardrails Notes

This section captures cross-cutting security, privacy and safety rules that apply
to **all** tools the agent can call (e.g. `rag_retriever`, `trend_fetcher`, `report_builder`).

These are “day-1” guardrails that we will refine in later sprints.

---

### 4.1 Input Validation & Sanitisation

**Goals:**  
- Prevent malformed / abusive inputs from breaking tools.  
- Avoid injection-style issues (prompt injection, SQL injection, path traversal).

**Practices (apply to all tools):**

- **Type & length checks**
  - Enforce maximum length on free-text fields (e.g. `query` ≤ 2,000 chars).
  - Enforce numeric ranges (e.g. `top_k` between 1 and 10).
- **Allow-lists for enums**
  - For fields like `program_code`, `year`, `country`, use allow-lists derived from configs or metadata.
- **Strip / normalise**
  - Trim whitespace, normalise Unicode, and strip control characters in strings before processing.
- **Reject clearly unsafe patterns**
  - If inputs contain obvious code fragments, OS commands, or known “prompt injection” patterns,
    tools should either:
    - return a safe error, or
    - perform extra checks before proceeding.

> Rule of thumb: **tools never blindly pass user text** into lower-level systems (DB queries, file paths, external APIs) without checks.

---

### 4.2 Authentication & Authorisation

**Goals:**  
- Make sure only authorised users and components can call tools.  
- Ensure the agent only calls tools that are allowed for the current context.

**Practices:**

- **Per-request identity**
  - Every tool call should have a notion of “who” triggered it:
    - `user_id` for human users (students / staff), or
    - `agent_id` / `service_id` for internal calls.
- **Role-based access**
  - Example roles: `student`, `faculty`, `reviewer`, `admin`.
  - Certain tools (e.g. internal benchmarking, reviewer-only reports) should **only** be callable by
    appropriate roles.
- **Context-aware tool access**
  - The agent should:
    - **not** call tools that require reviewer privileges when the user is a student;
    - only access data for the programmes/faculties the user is allowed to see.
- **AWS-level enforcement**
  - Use IAM roles and policies to restrict which Lambdas / Step Functions / APIs can:
    - read from specific S3 buckets,
    - query the vector store,
    - access trend data sources.

---

### 4.3 Data Classification & PII Handling

**Goals:**  
- Protect sensitive data (student info, internal reviewer comments, etc.).  
- Clearly separate **public** vs **internal** vs **confidential** content.

**Practices:**

- **Tag documents by classification**
  - `classification`: `"public" | "internal" | "confidential"`.
  - RAG should **never** expose `confidential` content to student-facing answers.
- **No PII in logs or prompts**
  - Avoid storing full names, emails, phone numbers, IDs in:
    - logs,
    - prompts,
    - vector store metadata (unless strictly necessary and justified).
- **Masking where needed**
  - If an answer must reference individuals, consider:
    - roles/titles instead of names (e.g. “programme coordinator” rather than “Dr X”)
    - aggregated statistics instead of raw records.

> Principle: assume anything logged could be seen by someone else; never log secrets or sensitive PII.

---

### 4.4 Rate Limiting, Timeouts & Resource Protection

**Goals:**  
- Protect systems from overload (accidental or malicious).  
- Prevent an agent from looping or over-calling expensive tools.

**Practices:**

- **Per-user rate limits**
  - e.g. max N queries per minute for student-facing Q&A.
- **Per-tool rate limits**
  - e.g. `trend_fetcher` may be limited more aggressively than `rag_retriever`.
- **Timeouts & circuit breakers**
  - Each tool call should have:
    - a maximum execution time (e.g. 5–10 seconds),
    - a safe fallback or user-friendly error message if it times out.
- **Agent-level guardrails**
  - Cap the number of tool calls per conversation/analysis (e.g. ≤ 10).
  - Limit recursion depth in planning loops.

---

### 4.5 Logging, Monitoring & Auditability

**Goals:**  
- Be able to debug problems and demonstrate governance.  
- Avoid storing unnecessary sensitive data.

**Practices:**

- **Structured logs**
  - Log: timestamp, tool name, request id, user/role, high-level status (`success`, `timeout`, `error_code`).
  - Do **not** log raw full prompts/responses by default; log summaries or hashed IDs.
- **Correlation IDs**
  - Use a `correlation_id` for end-to-end tracing:
    - One ID per user request / agent run,
    - Propagated to all tool calls.
- **Audit trail**
  - Keep track of:
    - which tools were called,
    - which documents were used in a RAG answer (doc IDs, not full content),
    - any overrides / manual changes by coordinators.

---

### 4.6 Response Filtering & Safety

**Goals:**  
- Prevent the system from returning harmful, inappropriate, or clearly incorrect content.  
- Ensure answers remain within the EDU-AGENT’s purpose.

**Practices:**

- **Scope enforcement**
  - Agent answers should stay within education/programme/curriculum guidance.
  - If a question is clearly out-of-scope (e.g. medical/financial advice), respond with a safe, redirecting message.
- **Fact-checking against corpus**
  - For key facts (entry requirements, credits, accreditation info), answers should:
    - be derived from RAG snippets,
    - or clearly state if the system is “unsure” or lacks data.
- **Citation requirement for critical info**
  - For programme rules, outcomes, requirements:
    - require the agent to provide at least one source snippet / reference.
- **Content filters**
  - Apply basic filters to block or rephrase:
    - abusive/harassing language,
    - obviously discriminatory content,
    - unsafe instructions.

---

### 4.7 Tool-Specific Guardrails (Summary Table)

This is a quick view of important guardrails per tool.

| Tool Name        | Key Risks                              | Guardrails                                                                                 |
|------------------|----------------------------------------|--------------------------------------------------------------------------------------------|
| `rag_retriever`  | Exposing confidential/internal docs    | Filter on `classification`; enforce role-based filters; limit `top_k`; log doc_ids only.  |
| `trend_fetcher`  | Overuse of external APIs, stale data   | Rate limit; caching; timeouts; mark data with `as_of` timestamp in responses.             |
| `report_builder` | Generating misleading or untraceable reports | Require citations for critical claims; embed doc_ids; include disclaimer sections.       |
| `qa_endpoint`    | Abuse, out-of-scope questions          | Input length limits; basic content filter; friendly out-of-scope responses.               |

(Teams should extend this as new tools are added.)

---

### 4.8 Open Questions / To Refine Later

These are security/guardrail topics we expect to refine in later sprints:

- How/where to implement **review workflows** for high-impact actions (e.g. “send campaign emails”).
- Exact **data retention** policies for logs and vector store contents.
- More advanced **prompt-injection defences** (e.g. separating system vs doc instructions, contrastive retrieval).
- Automated **red-team testing** of agent prompts and responses.

> For Sprint 1: document your assumptions and keep them small and conservative.  
> In later sprints we can relax or refine once we have more experience with real flows.
