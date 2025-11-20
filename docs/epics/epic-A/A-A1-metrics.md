### Core Program Performance Metrics (Team A – v1)

Level: one row per (program, date `dt`)

| Field name                | Type    | Description                                              |
|---------------------------|---------|----------------------------------------------------------|
| program_code              | string  | Unique code for the academic program                    |
| program_name              | string  | Human-readable program name                             |
| college_code              | string  | College/Faculty code (e.g. ENG, BUS)                    |
| dt                        | date    | Snapshot date for the metrics                           |
| enrollment_count          | int     | Total active enrolled students in the program on `dt`   |
| new_enrollments           | int     | Newly enrolled students during the period               |
| completions_count         | int     | Students who completed/graduated during the period      |
| dropouts_count            | int     | Students who dropped out during the period              |
| avg_gpa                   | double  | Average GPA for enrolled students                       |
| student_satisfaction_score| double  | Average satisfaction score (e.g. 1–5 scale)             |
