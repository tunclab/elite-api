import * as core from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as agw from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as r53t from 'aws-cdk-lib/aws-route53-targets';
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

    const hostedZone = r53.PublicHostedZone.fromHostedZoneAttributes(
      this,
      'hosted-zone',
      {
        hostedZoneId: 'Z02844713KMXUABLS9DJH',
        zoneName: 'clearsigma.com',
      },
    );

    const certificate = new acm.DnsValidatedCertificate(
      this,
      'elite-domain-cert',
      {
        domainName: 'api.elite.clearsigma.com',
        hostedZone,
      },
    );

    const api = new agw.LambdaRestApi(this, 'elite-api', {
      restApiName: 'elite-api',
      handler: fn,
      domainName: {
        domainName: 'api.elite.clearsigma.com',
        certificate,
      },
    });

    const aRecord = new r53.ARecord(this, 'elite-api-a-record', {
      zone: hostedZone,
      recordName: 'api.elite',
      target: r53.RecordTarget.fromAlias(new r53t.ApiGateway(api)),
    });

    this.exportValue(fn.functionArn, { name: 'api-fn-arn' });
    this.exportValue(api.restApiId, { name: 'api-id' });
    this.exportValue(fn.logGroup.logGroupName, { name: 'api-fn-logs' });
    this.exportValue(aRecord.domainName, { name: 'api-a-record' });
  }
}
