import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { Shelter } from 'src/v1/database/models/shelter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter])],
  controllers: [ShelterController],
  providers: [ShelterService],
})
export class ShelterModule {}
