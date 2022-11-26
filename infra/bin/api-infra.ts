#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EliteDatabaseStack } from '../lib/elite-database-stack';
import { EliteApiStack } from '../lib/elite-api-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new EliteDatabaseStack(app, 'elite-db-stack', { env });

new EliteApiStack(app, 'elite-api-stack', { env });
