import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppClusterConfig } from './app-cluster.config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { V1AppModule } from './v1/app.module';
import { HttpExceptionFilter } from './config/error/http-exception.filter';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    V1AppModule,
    new FastifyAdapter(),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/chansey');
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(V1AppModule), { fallbackOnErrors: true });

  await app.listen(config.app.port | 3000);
}

AppClusterConfig.clusterize(bootstrap);
