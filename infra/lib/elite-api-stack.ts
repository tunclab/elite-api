import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as agw from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

export class EliteApiStack extends core.Stack {
  constructor(scope: Construct, id: string, props: core.StackProps) {
    super(scope, id, props);

    const codeHome = path.join(process.cwd(), '../dist');

    const depLayer = new lambda.LayerVersion(this, `elite-api-layer`, {
      code: lambda.Code.fromAsset(path.join(process.cwd(), 'layers')),
      layerVersionName: 'elite-api-dependencies-layer',
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
    });

    const fn = new lambda.Function(this, 'elite-api-fn', {
      functionName: 'elite-apis',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset(codeHome),
      handler: 'main.handler',
      layers: [depLayer],
      logRetention: logs.RetentionDays.ONE_WEEK,
      timeout: core.Duration.seconds(60),
    });

    const api = new agw.LambdaRestApi(this, 'elite-api', {
      restApiName: 'elite-api',
      handler: fn,
    });

    this.exportValue(fn.functionArn, { name: 'api-fn-arn' });
    this.exportValue(api.restApiId, { name: 'api-id' });
    this.exportValue(fn.logGroup.logGroupName, { name: 'api-fn-logs' });
  }
}
