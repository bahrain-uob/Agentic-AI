const express = require('express');
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const app = express();
app.use(express.json());
const lambda = new LambdaClient({ region: "" }); // The region of the lambda function
const LAMBDA_FUNCTION_NAME = ""; // Lambda function name
// An /ask POST endpoint is exposed via Node/Express in the Team B backend.
app.post('/ask', async (req, res) => {
    // The endpoint accepts JSON payloads of the shape { "question": "string", "metadata": { ... } }.
    const { question, metadata } = req.body || {};
    // On error (Invalid input), the endpoint returns a non-200 status with a structured error.message and logs the failure
    if (typeof question !== "string"){
        return res.status(400).json({ error: { message: "Missing or invalid 'question'" } });
    }
    try {
        const lambdaPayload = {
            question,
            metadata: metadata || {},
        };
        const result = await lambda.send(
            new InvokeCommand({
                FunctionName: LAMBDA_FUNCTION_NAME,
                Payload: Buffer.from(JSON.stringify(lambdaPayload)),
            })
        );
        //  On error (Lambda failure), the endpoint returns a non-200 status with a structured error.message and logs the failure
        if (result.FunctionError) {
            console.error("Lambda Error", result.FunctionError, result.Payload?.toString());
            return res.status(502).json({ error: { message: "Chat backend error: " + result.FunctionError } });
        }
        // Assume Lambda returns JSON: { answer, sources, trace }
        const response = JSON.parse(Buffer.from(result.Payload).toString());
        return res.status(200).json({
            answer: response.answer,
            sources: response.sources,
            trace: response.trace,
        });
    } catch (err) {
        console.error("/ask endpoint failure", err);
        return res.status(500).json({ error: { message: "Internal Service Error" } });
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));