import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseModel } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), databaseModel, HealthModule, ShelterModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class V1AppModule {}
