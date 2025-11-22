const {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand
} = require("@aws-sdk/client-athena");

const client = new AthenaClient({ region: "us-east-1" });

const METRICS_DB = process.env.METRICS_DB || "default";
const METRICS_TABLE = process.env.METRICS_TABLE || "team_a_program_daily_metrics";
const OUTPUT_LOCATION = process.env.ATHENA_OUTPUT;
const WORKGROUP = process.env.ATHENA_WORKGROUP || "primary";

exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const period = body.period;

  if (!period) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required field: period" }) };
  }

  let periodFilter;
  switch (period) {
    case "current_semester":
      periodFilter = `
        try(date_parse(dt, '%Y-%m-%d')) IS NOT NULL
        AND date_parse(dt, '%Y-%m-%d')
          BETWEEN date '2025-09-01' AND date '2025-12-31'
      `;
      break;
    case "last_year":
      periodFilter = `
        try(date_parse(dt, '%Y-%m-%d')) IS NOT NULL
        AND year(date_parse(dt, '%Y-%m-%d')) = year(current_date) - 1
      `;
      break;
    default:
      return { statusCode: 400, body: JSON.stringify({ error: `Invalid period: ${period}` }) };
  }

  const query = `
    SELECT
      SUM(enrollment_count) AS total_enrollments,
      SUM(new_enrollments) AS new_enrollments,
      SUM(completions_count) AS completions,
      SUM(dropouts_count) AS dropouts,
      AVG(avg_gpa) AS avg_gpa,
      AVG(student_satisfaction_score) AS avg_satisfaction
    FROM ${METRICS_DB}.${METRICS_TABLE}
    WHERE ${periodFilter};
  `;

  try {
    const startResp = await client.send(new StartQueryExecutionCommand({
      QueryString: query,
      QueryExecutionContext: { Database: METRICS_DB },
      ResultConfiguration: { OutputLocation: OUTPUT_LOCATION },
      WorkGroup: WORKGROUP,
    }));

    const queryExecutionId = startResp.QueryExecutionId;
    let state = "RUNNING";
    while (state === "RUNNING" || state === "QUEUED") {
      await new Promise(r => setTimeout(r, 2000));
      const statusResp = await client.send(new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId }));
      state = statusResp.QueryExecution.Status.State;
      if (state === "FAILED" || state === "CANCELLED") {
        throw new Error("Athena query failed: " + JSON.stringify(statusResp));
      }
    }

    const results = await client.send(new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId }));
    const headers = results.ResultSet.Rows[0].Data.map(col => col.VarCharValue || null);
    const dataRows = results.ResultSet.Rows.slice(1).map(row =>
      row.Data.reduce((obj, col, i) => {
        obj[headers[i]] = col.VarCharValue || null;
        return obj;
      }, {})
    );

    return { statusCode: 200, body: JSON.stringify({ status: "success", period, results: dataRows }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: "error", details: err.message }) };
  }
};
