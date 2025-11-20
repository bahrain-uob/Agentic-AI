## A-A3 – Synthetic Metrics Ingestion (Team A)

- Synthetic program metrics CSV created for BSCS and BBA.
- Uploaded to S3:

  s3://uob-team-a-analytics/program_daily_metrics/program_daily_metrics_sample.csv

- Athena external table: `team_a_program_daily_metrics`

Example query used to validate the data:

```sql
SELECT program_code,
       program_name,
       college_code,
       enrollment_count,
       avg_gpa,
       student_satisfaction_score,
       dt
FROM team_a_program_daily_metrics
ORDER BY dt, program_code
LIMIT 20;
