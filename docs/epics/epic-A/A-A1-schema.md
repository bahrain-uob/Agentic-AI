# A-A1 – Athena Table Schema (Team A Program Metrics)

This schema defines the storage structure for the Core Program Performance Metrics.

## Table Overview
**Table name:** `team_a_program_daily_metrics`  
**Grain:** One row per (program_code, dt)  
**Partition:** `dt` (snapshot date)

## Column Definitions

### Dimensions
| Column         | Type   | Description                                                                 |
|----------------|--------|-----------------------------------------------------------------------------|
| program_code   | string | Unique program identifier                                                   |
| program_name   | string | Human-readable program name                                                 |
| college_code   | string | College/Faculty code (e.g., ENG, BUS)                                       |

### Metrics
| Column                       | Type   | Description                                     |
|------------------------------|--------|-------------------------------------------------|
| enrollment_count             | int    | Active enrolled students on `dt`                |
| new_enrollments              | int    | New enrollments during the period               |
| completions_count            | int    | Students who completed/gradated the program     |
| dropouts_count               | int    | Students who dropped out                        |
| avg_gpa                      | double | Average GPA                                     |
| student_satisfaction_score   | double | Average satisfaction score (1–5)                |

### Partition Column
| Column | Type | Description                                                                 |
|--------|------|-----------------------------------------------------------------------------|
| dt     | date | Snapshot date. Named `dt` instead of `date` because `date` is a SQL reserved keyword. |

## Athena DDL

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS team_a_program_daily_metrics (
  program_code                string,
  program_name                string,
  college_code                string,

  enrollment_count            int,
  new_enrollments             int,
  completions_count           int,
  dropouts_count              int,
  avg_gpa                     double,
  student_satisfaction_score  double
)
PARTITIONED BY (
  dt date
)
ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde'
WITH SERDEPROPERTIES (
  'separatorChar' = ',',
  'quoteChar' = '"'
)
STORED AS TEXTFILE
LOCATION 's3://<YOUR-BUCKET>/program_daily_metrics/';
