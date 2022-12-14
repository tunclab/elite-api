"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliteApiStack = void 0;
const core = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const agw = require("aws-cdk-lib/aws-apigateway");
const logs = require("aws-cdk-lib/aws-logs");
const acm = require("aws-cdk-lib/aws-certificatemanager");
const r53 = require("aws-cdk-lib/aws-route53");
const r53t = require("aws-cdk-lib/aws-route53-targets");
const path = require("path");
class EliteApiStack extends core.Stack {
    constructor(scope, id, props) {
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
        const hostedZone = r53.PublicHostedZone.fromHostedZoneAttributes(this, 'hosted-zone', {
            hostedZoneId: 'Z02844713KMXUABLS9DJH',
            zoneName: 'clearsigma.com',
        });
        const certificate = new acm.DnsValidatedCertificate(this, 'elite-domain-cert', {
            domainName: 'api.elite.clearsigma.com',
            hostedZone,
        });
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
exports.EliteApiStack = EliteApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxpdGUtYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxpdGUtYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUFvQztBQUVwQyxpREFBaUQ7QUFDakQsa0RBQWtEO0FBQ2xELDZDQUE2QztBQUM3QywwREFBMEQ7QUFDMUQsK0NBQStDO0FBQy9DLHdEQUF3RDtBQUN4RCw2QkFBNkI7QUFFN0IsTUFBYSxhQUFjLFNBQVEsSUFBSSxDQUFDLEtBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ2hFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvRCxnQkFBZ0IsRUFBRSw4QkFBOEI7WUFDaEQsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUNqRCxDQUFDLENBQUM7UUFFSCxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNuRCxZQUFZLEVBQUUsWUFBWTtZQUMxQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7WUFDekMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFFSCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQzlELElBQUksRUFDSixhQUFhLEVBQ2I7WUFDRSxZQUFZLEVBQUUsdUJBQXVCO1lBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FDRixDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsdUJBQXVCLENBQ2pELElBQUksRUFDSixtQkFBbUIsRUFDbkI7WUFDRSxVQUFVLEVBQUUsMEJBQTBCO1lBQ3RDLFVBQVU7U0FDWCxDQUNGLENBQUM7UUFFRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNuRCxXQUFXLEVBQUUsV0FBVztZQUN4QixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUUsMEJBQTBCO2dCQUN0QyxXQUFXO2FBQ1o7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzFELElBQUksRUFBRSxVQUFVO1lBQ2hCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRjtBQTVERCxzQ0E0REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb3JlIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYWd3IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGxvZ3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxvZ3MnO1xuaW1wb3J0ICogYXMgYWNtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXInO1xuaW1wb3J0ICogYXMgcjUzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1yb3V0ZTUzJztcbmltcG9ydCAqIGFzIHI1M3QgZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMtdGFyZ2V0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgY2xhc3MgRWxpdGVBcGlTdGFjayBleHRlbmRzIGNvcmUuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogY29yZS5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBjb2RlSG9tZSA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi4vZGlzdCcpO1xuXG4gICAgY29uc3QgZGVwTGF5ZXIgPSBuZXcgbGFtYmRhLkxheWVyVmVyc2lvbih0aGlzLCBgZWxpdGUtYXBpLWxheWVyYCwge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnbGF5ZXJzJykpLFxuICAgICAgbGF5ZXJWZXJzaW9uTmFtZTogJ2VsaXRlLWFwaS1kZXBlbmRlbmNpZXMtbGF5ZXInLFxuICAgICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1hdLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdlbGl0ZS1hcGktZm4nLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6ICdlbGl0ZS1hcGlzJyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KGNvZGVIb21lKSxcbiAgICAgIGhhbmRsZXI6ICdtYWluLmhhbmRsZXInLFxuICAgICAgbGF5ZXJzOiBbZGVwTGF5ZXJdLFxuICAgICAgbG9nUmV0ZW50aW9uOiBsb2dzLlJldGVudGlvbkRheXMuT05FX1dFRUssXG4gICAgICB0aW1lb3V0OiBjb3JlLkR1cmF0aW9uLnNlY29uZHMoNjApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaG9zdGVkWm9uZSA9IHI1My5QdWJsaWNIb3N0ZWRab25lLmZyb21Ib3N0ZWRab25lQXR0cmlidXRlcyhcbiAgICAgIHRoaXMsXG4gICAgICAnaG9zdGVkLXpvbmUnLFxuICAgICAge1xuICAgICAgICBob3N0ZWRab25lSWQ6ICdaMDI4NDQ3MTNLTVhVQUJMUzlESkgnLFxuICAgICAgICB6b25lTmFtZTogJ2NsZWFyc2lnbWEuY29tJyxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbmV3IGFjbS5EbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZShcbiAgICAgIHRoaXMsXG4gICAgICAnZWxpdGUtZG9tYWluLWNlcnQnLFxuICAgICAge1xuICAgICAgICBkb21haW5OYW1lOiAnYXBpLmVsaXRlLmNsZWFyc2lnbWEuY29tJyxcbiAgICAgICAgaG9zdGVkWm9uZSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnZWxpdGUtYXBpJywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdlbGl0ZS1hcGknLFxuICAgICAgaGFuZGxlcjogZm4sXG4gICAgICBkb21haW5OYW1lOiB7XG4gICAgICAgIGRvbWFpbk5hbWU6ICdhcGkuZWxpdGUuY2xlYXJzaWdtYS5jb20nLFxuICAgICAgICBjZXJ0aWZpY2F0ZSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBhUmVjb3JkID0gbmV3IHI1My5BUmVjb3JkKHRoaXMsICdlbGl0ZS1hcGktYS1yZWNvcmQnLCB7XG4gICAgICB6b25lOiBob3N0ZWRab25lLFxuICAgICAgcmVjb3JkTmFtZTogJ2FwaS5lbGl0ZScsXG4gICAgICB0YXJnZXQ6IHI1My5SZWNvcmRUYXJnZXQuZnJvbUFsaWFzKG5ldyByNTN0LkFwaUdhdGV3YXkoYXBpKSksXG4gICAgfSk7XG5cbiAgICB0aGlzLmV4cG9ydFZhbHVlKGZuLmZ1bmN0aW9uQXJuLCB7IG5hbWU6ICdhcGktZm4tYXJuJyB9KTtcbiAgICB0aGlzLmV4cG9ydFZhbHVlKGFwaS5yZXN0QXBpSWQsIHsgbmFtZTogJ2FwaS1pZCcgfSk7XG4gICAgdGhpcy5leHBvcnRWYWx1ZShmbi5sb2dHcm91cC5sb2dHcm91cE5hbWUsIHsgbmFtZTogJ2FwaS1mbi1sb2dzJyB9KTtcbiAgICB0aGlzLmV4cG9ydFZhbHVlKGFSZWNvcmQuZG9tYWluTmFtZSwgeyBuYW1lOiAnYXBpLWEtcmVjb3JkJyB9KTtcbiAgfVxufVxuIl19