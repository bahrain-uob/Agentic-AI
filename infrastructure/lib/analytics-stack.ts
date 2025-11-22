import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from "aws-cdk-lib/aws-iam";

export class AnalyticsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const analyticsHandler = new lambda.Function(this, "AnalyticsHandlerLambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "analytics_handler.handler",
      code: lambda.Code.fromAsset("assets/lambda"),
      timeout: cdk.Duration.seconds(60),
      environment: {
        METRICS_DB: "default",
        METRICS_TABLE: "team_a_program_daily_metrics",
        ATHENA_OUTPUT: "s3://team-a-athena-output/program_daily_metrics/",
        ATHENA_WORKGROUP: "primary",
      },
    });

    analyticsHandler.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        "athena:StartQueryExecution",
        "athena:GetQueryExecution",
        "athena:GetQueryResults"
      ],
      resources: ["*"],
    }));

    analyticsHandler.addToRolePolicy(new iam.PolicyStatement({
      actions: ["s3:ListBucket"],
      resources: ["arn:aws:s3:::team-a-athena-output"],
    }));

    analyticsHandler.addToRolePolicy(new iam.PolicyStatement({
      actions: ["s3:GetObject", "s3:PutObject"],
      resources: ["arn:aws:s3:::team-a-athena-output/*"],
    }));

    const api = new apigateway.RestApi(this, "AnalyticsApi", {
      restApiName: "Team A Analytics Service",
    });

    const analytics = api.root.addResource("analytics");
    analytics.addMethod("POST", new apigateway.LambdaIntegration(analyticsHandler));

    new cdk.CfnOutput(this, "AnalyticsApiEndpoint", {
      value: api.url,
    });
  }
}
