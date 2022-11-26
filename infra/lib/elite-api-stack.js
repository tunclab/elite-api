"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliteApiStack = void 0;
const core = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const agw = require("aws-cdk-lib/aws-apigateway");
const logs = require("aws-cdk-lib/aws-logs");
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
        const api = new agw.LambdaRestApi(this, 'elite-api', {
            restApiName: 'elite-api',
            handler: fn,
        });
        this.exportValue(fn.functionArn, { name: 'api-fn-arn' });
        this.exportValue(api.restApiId, { name: 'api-id' });
        this.exportValue(fn.logGroup.logGroupName, { name: 'api-fn-logs' });
    }
}
exports.EliteApiStack = EliteApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxpdGUtYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxpdGUtYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9DQUFvQztBQUVwQyxpREFBaUQ7QUFDakQsa0RBQWtEO0FBQ2xELDZDQUE2QztBQUM3Qyw2QkFBNkI7QUFFN0IsTUFBYSxhQUFjLFNBQVEsSUFBSSxDQUFDLEtBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyRCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ2hFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvRCxnQkFBZ0IsRUFBRSw4QkFBOEI7WUFDaEQsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUNqRCxDQUFDLENBQUM7UUFFSCxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNuRCxZQUFZLEVBQUUsWUFBWTtZQUMxQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7WUFDekMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNuQyxDQUFDLENBQUM7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUNuRCxXQUFXLEVBQUUsV0FBVztZQUN4QixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUEvQkQsc0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29yZSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBsb2dzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sb2dzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjbGFzcyBFbGl0ZUFwaVN0YWNrIGV4dGVuZHMgY29yZS5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBjb3JlLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGNvZGVIb21lID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuLi9kaXN0Jyk7XG5cbiAgICBjb25zdCBkZXBMYXllciA9IG5ldyBsYW1iZGEuTGF5ZXJWZXJzaW9uKHRoaXMsIGBlbGl0ZS1hcGktbGF5ZXJgLCB7XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdsYXllcnMnKSksXG4gICAgICBsYXllclZlcnNpb25OYW1lOiAnZWxpdGUtYXBpLWRlcGVuZGVuY2llcy1sYXllcicsXG4gICAgICBjb21wYXRpYmxlUnVudGltZXM6IFtsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWF0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBmbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ2VsaXRlLWFwaS1mbicsIHtcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ2VsaXRlLWFwaXMnLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoY29kZUhvbWUpLFxuICAgICAgaGFuZGxlcjogJ21haW4uaGFuZGxlcicsXG4gICAgICBsYXllcnM6IFtkZXBMYXllcl0sXG4gICAgICBsb2dSZXRlbnRpb246IGxvZ3MuUmV0ZW50aW9uRGF5cy5PTkVfV0VFSyxcbiAgICAgIHRpbWVvdXQ6IGNvcmUuRHVyYXRpb24uc2Vjb25kcyg2MCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBhcGkgPSBuZXcgYWd3LkxhbWJkYVJlc3RBcGkodGhpcywgJ2VsaXRlLWFwaScsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiAnZWxpdGUtYXBpJyxcbiAgICAgIGhhbmRsZXI6IGZuLFxuICAgIH0pO1xuXG4gICAgdGhpcy5leHBvcnRWYWx1ZShmbi5mdW5jdGlvbkFybiwgeyBuYW1lOiAnYXBpLWZuLWFybicgfSk7XG4gICAgdGhpcy5leHBvcnRWYWx1ZShhcGkucmVzdEFwaUlkLCB7IG5hbWU6ICdhcGktaWQnIH0pO1xuICAgIHRoaXMuZXhwb3J0VmFsdWUoZm4ubG9nR3JvdXAubG9nR3JvdXBOYW1lLCB7IG5hbWU6ICdhcGktZm4tbG9ncycgfSk7XG4gIH1cbn1cbiJdfQ==