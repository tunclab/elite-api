import { Stack, StackProps } from 'aws-cdk-lib';
import * as db from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class EliteDatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const mainTable = new db.Table(this, 'elite-main-table', {
      tableName: 'elite-main',
      partitionKey: { name: 'pk', type: db.AttributeType.STRING },
      sortKey: { name: 'sk', type: db.AttributeType.STRING },
      billingMode: db.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
    });

    this.exportValue(mainTable.tableArn, { name: 'main-table' });
  }
}
