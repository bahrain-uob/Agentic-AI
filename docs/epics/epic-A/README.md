# Epic A – Program Analytics & Executive Dashboards

This epic focuses on delivering analytics capabilities for university leadership,
administrators, and enrollment managers. It includes data modeling, Athena views,
UI analytics integration, narrative generation, and reporting flows.

---

## 📌 Metrics & Schema (Team A)

This section summarizes the data structure used in Epic A for program analytics.

### 1. Core Program Performance Metrics

Defined in: `A-A1-metrics.md`

These metrics represent one row per **(program, date `dt`)** and form the foundation
for analytics, dashboards, and Bedrock narrative summarisation.

Key metrics include:

- enrollment_count  
- new_enrollments  
- completions_count  
- dropouts_count  
- avg_gpa  
- student_satisfaction_score  

Full definition in:  
`docs/epics/epic-A/A-A1-metrics.md`

---

### 2. Athena Table Schema

Defined in: `A-A1-schema.md`

**Table:** `team_a_program_daily_metrics`  
**Grain:** one row per (program_code, dt)  
**Partition:** dt (snapshot date)

Includes:

- Dimensions: program_code, program_name, college_code  
- Metrics: enrollment_count, new_enrollments, completions_count, dropouts_count, avg_gpa, student_satisfaction_score  
- Partitioning strategy and DDL for Athena

Full schema in:  
`docs/epics/epic-A/A-A1-schema.md`

---

### 3. Sample Data

Sample dataset for testing and UI integration located in:

`docs/epics/epic-A/samples/program_daily_metrics_sample.csv`

This file contains realistic entries for:

- B.Sc. Computer Science (CIT)  
- BBA (BUS)

The sample supports Athena validation and frontend chart rendering.

---

### Status of A-A1

- ✅ Metrics defined  
- ✅ Athena schema defined  
- ✅ Sample CSV created  
- 🔄 Documentation integrated (this section)  
