import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';
import { ShelterModule } from './modules/shelter/shelter.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { config } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          uri: config.db.url,
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
    ShelterModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class V1AppModule {}
