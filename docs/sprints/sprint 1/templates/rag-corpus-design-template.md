## 1. Corpus Overview

List the main document sources:

| ID | Source Name                          | Type     | Format | Location / Link                | Priority (H/M/L) |
|----|--------------------------------------|----------|--------|--------------------------------|------------------|
| 1  | Programme Catalogue 2024            | Internal | PDF    | S3 / SharePoint / Git repo     | H                |
| 2  | BQA Standards – Computing           | External | PDF    | URL or file path               | H                |
| 3  | ACM Curriculum Guidelines           | External | PDF    | URL or file path               | M                |
| …  |                                      |          |        |                                |                  |

## 2. Chunking Strategy

Describe how you will split documents:

- Approximate chunk size (e.g. 500 tokens / ~2–3 paragraphs).
- Overlap between chunks (e.g. 50–100 tokens).
- Special handling:
  - Tables?
  - Learning outcomes lists?
  - Admission requirement sections?

## 3. Metadata Schema

Define the fields stored with each chunk:

| Field Name      | Type    | Example                  | Notes                                  |
|-----------------|---------|--------------------------|----------------------------------------|
| doc_id          | string  | "catalogue_2024"         | Unique per document                    |
| section_title   | string  | "Admission Requirements" |                                        |
| program_code    | string  | "CS-Cloud"               |                                        |
| faculty         | string  | "IT"                     |                                        |
| year            | string  | "2024"                   |                                        |
| country         | string  | "BH"                     | For comparator programmes              |
| source_type     | string  | "internal" / "external"  |                                        |
| …               |         |                          |                                        |

## 4. Vector Store Options (PoC Recommendation)

Compare at least two options (e.g. OpenSearch vs DynamoDB + embeddings):

- Option 1:
  - Pros:
  - Cons:
- Option 2:
  - Pros:
  - Cons:
- **Recommended for PoC:**
  - …

## 5. Retrieval Strategy

- Default `top_k` (e.g. 3–5).
- How to use filters (e.g. program_code, year).
- Any special ranking rules.