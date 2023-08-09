import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { V1AppModule } from './v1/app.module';
import { FastifyServerOptions, FastifyInstance, fastify } from 'fastify';
import * as awsLambdaFastify from 'aws-lambda-fastify';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { HttpExceptionFilter } from './config/error/http-exception.filter';
import { useContainer } from 'class-validator';
import { config } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

let cachedNestApp: NestApp;

function swaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('API Chansey')
    .setDescription(
      'Lambda responsável pelo gerenciamento de abrigos do sistema Pluvial.',
    )
    .setVersion('1.0')
    .addSecurity('TokenAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('TokenAuth')
    .build();

  return config;
}

async function bootstrapServer(): Promise<NestApp> {
  const serverOptions: FastifyServerOptions = { logger: true };
  const instance: FastifyInstance = fastify(serverOptions);
  const app = await NestFactory.create<NestFastifyApplication>(
    V1AppModule,
    new FastifyAdapter(instance),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (config.app.environment.toUpperCase() !== 'PRD') {
    app.setGlobalPrefix('dev/api/chansey');
    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup('api/chansey/docs', app, document);
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(V1AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('api/chansey');

  await app.init();
  return { app, instance };
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  if (!cachedNestApp) {
    cachedNestApp = await bootstrapServer();
  }
  const proxy = awsLambdaFastify(cachedNestApp.instance);
  return proxy(event, context);
};