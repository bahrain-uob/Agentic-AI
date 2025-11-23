## API Endpoints

### POST /ask

Student support chat endpoint. Receives a question, forwards it to the chat orchestration Lambda, and returns a normalized response with answer, sources, and trace.

**Request:**
```json
{
  "question": "What are the admission requirements for the Computer Science program?",
  "metadata": {
    "studentId": "STU123",
    "timestamp": "2025-11-23T10:30:00Z"
  }
}
```

**Response (200 OK):**
```json
{
  "answer": "The Computer Science program requires a minimum GPA of 3.0 and proficiency in mathematics.",
  "sources": [
    "Academic Handbook 2025-26, Section 3.2",
    "CS Program Requirements v2.1"
  ],
  "trace": [
    "Retrieved from vector store",
    "Ranked by relevance score: 0.89",
    "Formatted by orchestrator"
  ]
}
```

**Error Response (4xx/5xx):**
```json
{
  "error": {
    "message": "Missing or invalid 'question'"
  }
}
```

**Status Codes:**
- `200` – Success
- `400` – Invalid input (missing or non-string question)
- `502` – Lambda execution failure
- `500` – Internal server error