/**
 Analytics Lambda Handler is a Lambda functions that executes Athena queries over Team A metrics tables
 and returns aggregated enrollment and completion metrics.
 the function is Linked to Analytics UI and relevant user stories: US-01, US-03, US-06, US-09
 */

const {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand
} = require("@aws-sdk/client-athena");

const client = new AthenaClient({ region: process.env.AWS_REGION });

exports.analytics_handler = async (event) => {
  const responseTemplate = (statusCode, status, details, data = null) => ({
    statusCode,
    body: JSON.stringify({ status, details, data }),
  });

  const period = event.period || "current_semester";
  const db = process.env.METRICS_DB;
  const table = process.env.METRICS_TABLE;
  const outputBucket = process.env.OUTPUT_BUCKET;

  const periodMap = {
    "current_semester": "2025-10-01,2025-10-31",
    "last_semester": "2025-05-01,2025-09-30",
  };

  if (!periodMap[period]) {
    return responseTemplate(400, "error", "Invalid period");
  }

  const [startDate, endDate] = periodMap[period].split(",");

  const query = `
    SELECT 
      SUM(enrollment_count) AS total_enrollments,
      SUM(completions_count) AS total_completions
    FROM ${db}.${table}
    WHERE date_parse(dt, '%Y-%m-%d') BETWEEN DATE '${startDate}' AND DATE '${endDate}'
  `;

  try {
    const startCommand = new StartQueryExecutionCommand({
      QueryString: query,
      ResultConfiguration: { OutputLocation: `s3://${outputBucket}/` },
    });

    const startResult = await client.send(startCommand);
    const queryExecutionId = startResult.QueryExecutionId;

    let status = "RUNNING";
    let timeoutMs = 0;
    const timeoutLimit = 30000; // 30 seconds
    const intervalMs = 1000;

    while (status === "RUNNING" || status === "QUEUED") {
      const getStatus = await client.send(new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId }));
      status = getStatus.QueryExecution.Status.State;

      if (status === "FAILED" || status === "CANCELLED") {
        return responseTemplate(500, "error", "Athena query failed");
      }

      if (timeoutMs >= timeoutLimit) {
        return responseTemplate(504, "error", "Athena query timeout");
      }

      if (status === "SUCCEEDED") break;

      await new Promise(r => setTimeout(r, intervalMs));
      timeoutMs += intervalMs;
    }

    const resultsCommand = new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId });
    const results = await client.send(resultsCommand);

    if (!results.ResultSet.Rows[1]) {
      return responseTemplate(200, "success", "No data found", { total_enrollments: 0, total_completions: 0, period });
    }

    const row = results.ResultSet.Rows[1];
    const [total_enrollments, total_completions] = row.Data.map(d => Number(d.VarCharValue));

    return responseTemplate(200, "success", "Query succeeded", { total_enrollments, total_completions, period });

  } catch (err) {
    console.error("Lambda error:", err);
    return responseTemplate(500, "error", err.message);
  }
};
