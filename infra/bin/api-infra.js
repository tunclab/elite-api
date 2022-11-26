#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const elite_database_stack_1 = require("../lib/elite-database-stack");
const elite_api_stack_1 = require("../lib/elite-api-stack");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
new elite_database_stack_1.EliteDatabaseStack(app, 'elite-db-stack', { env });
new elite_api_stack_1.EliteApiStack(app, 'elite-api-stack', { env });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWluZnJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLWluZnJhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsc0VBQWlFO0FBQ2pFLDREQUF1RDtBQUV2RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUUxQixNQUFNLEdBQUcsR0FBRztJQUNWLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtJQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7Q0FDdkMsQ0FBQztBQUVGLElBQUkseUNBQWtCLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUV2RCxJQUFJLCtCQUFhLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBFbGl0ZURhdGFiYXNlU3RhY2sgfSBmcm9tICcuLi9saWIvZWxpdGUtZGF0YWJhc2Utc3RhY2snO1xuaW1wb3J0IHsgRWxpdGVBcGlTdGFjayB9IGZyb20gJy4uL2xpYi9lbGl0ZS1hcGktc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCBlbnYgPSB7XG4gIGFjY291bnQ6IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQsXG4gIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OLFxufTtcblxubmV3IEVsaXRlRGF0YWJhc2VTdGFjayhhcHAsICdlbGl0ZS1kYi1zdGFjaycsIHsgZW52IH0pO1xuXG5uZXcgRWxpdGVBcGlTdGFjayhhcHAsICdlbGl0ZS1hcGktc3RhY2snLCB7IGVudiB9KTtcbiJdfQ==