import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Server } from 'http';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
import { Context } from 'aws-lambda';

let cachedServer: Server;

async function localBootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
  });
  await app.listen(3000);
}

async function createApp(expressApp: Express): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.useGlobalPipes(new ValidationPipe());

  return app;
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  await app.init();

  return createServer(expressApp);
}

function runLocal() {
  localBootstrap().then(() => console.log('Bootstrapped to run locally....'));
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return proxy(cachedServer, event, context, 'PROMISE').promise;
}

runLocal();
