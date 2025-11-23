const {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand
} = require("@aws-sdk/client-athena");

const client = new AthenaClient({ region: process.env.AWS_REGION });

exports.analytics_handler = async (event) => {
  const period = event.period || "current_semester";
  const db = process.env.METRICS_DB;
  const table = process.env.METRICS_TABLE;
  const outputBucket = process.env.OUTPUT_BUCKET;

  const periodMap = {
    current_semester: "2025-10-01,2025-10-31",
    last_semester: "2025-05-01,2025-09-30"
  };

  if (!periodMap[period]) {
    return { statusCode: 400, body: JSON.stringify({ status: "error", details: "Invalid period" }) };
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
      ResultConfiguration: { OutputLocation: `s3://${outputBucket}/` }
    });

    const startResult = await client.send(startCommand);
    const queryExecutionId = startResult.QueryExecutionId;

    let status = "RUNNING";
    while (status === "RUNNING" || status === "QUEUED") {
      const getStatus = await client.send(new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId }));
      status = getStatus.QueryExecution.Status.State;

      if (status === "FAILED" || status === "CANCELLED") {
        return { statusCode: 500, body: JSON.stringify({ status: "error", details: "Athena query failed" }) };
      }

      if (status === "SUCCEEDED") break;
      await new Promise(r => setTimeout(r, 1000));
    }

    const resultsCommand = new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId });
    const results = await client.send(resultsCommand);

    if (!results.ResultSet.Rows[1]) {
      return { statusCode: 200, body: JSON.stringify({ status: "success", data: { total_enrollments: 0, total_completions: 0, period } }) };
    }

    const row = results.ResultSet.Rows[1];
    const [total_enrollments, total_completions] = row.Data.map(d => Number(d.VarCharValue));

    return { statusCode: 200, body: JSON.stringify({ status: "success", data: { total_enrollments, total_completions, period } }) };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: "error", details: err.message }) };
  }
};
