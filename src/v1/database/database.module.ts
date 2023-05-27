import { config } from 'src/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const databaseModel = TypeOrmModule.forRoot({
  type: config.db.name as 'mongodb',
  url: config.db.url,
  entities: [path.resolve(__dirname, 'models', '*')],
  cli: {
    entitiesDir: path.resolve(__dirname, 'models'),
  },
  synchronize: true,
  logging: true,
} as TypeOrmModuleOptions);
