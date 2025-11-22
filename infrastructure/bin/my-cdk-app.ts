import * as cdk from "aws-cdk-lib";
import { MyCdkStack } from "../lib/my-cdk-app-stack";
import { DBStack } from "../lib/DBstack";
import { APIStack } from "../lib/api-stack";
import { AnalyticsStack } from "../lib/analytics-stack"; 

const app = new cdk.App();

// Create the DBStack
const dbStack = new DBStack(app, "DBStack", {
  // Any custom stack props you may have for DBStack
});

// Create the APIStack, passing in the DBStack as a dependency
new APIStack(app, "APIStack", dbStack);


new AnalyticsStack(app, "AnalyticsStack")


// Optionally, you can create your other stacks here if needed
new MyCdkStack(app, "MyCdkAppStack");
