import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { Shelter, ShelterSchema } from 'src/v1/database/models/shelter.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUniqueConstraint } from './validators/IsUnique.validator';
import { Geocoding } from 'src/providers/geocoding';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }]),
  ],
  controllers: [ShelterController],
  providers: [ShelterService, IsUniqueConstraint, Geocoding],
})
export class ShelterModule {}
