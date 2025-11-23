import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";

export class AnalyticsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const outputBucket = new s3.Bucket(this, "AnalyticsOutputBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const analyticsLambda = new lambda.Function(this, "AnalyticsHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "analytics_handler.analytics_handler",
      code: lambda.Code.fromAsset("assets/lambda"),
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
      environment: {
        METRICS_DB: "default",
        METRICS_TABLE: "team_a_program_daily_metrics",
        OUTPUT_BUCKET: outputBucket.bucketName
      }
    });

    outputBucket.grantReadWrite(analyticsLambda);

    analyticsLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults"
      ],
      resources: ["*"]
    }));

    analyticsLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      resources: [
        "arn:aws:s3:::uob-team-a-analytics",
        "arn:aws:s3:::uob-team-a-analytics/*"
      ]
    }));

    analyticsLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetPartition",
        "glue:GetPartitions"
      ],
      resources: ["*"]
    }));

    new cdk.CfnOutput(this, "AnalyticsLambdaArn", { value: analyticsLambda.functionArn });
    new cdk.CfnOutput(this, "AnalyticsOutputBucketName", { value: outputBucket.bucketName });
  }
}
