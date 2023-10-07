import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from 'src/v1/database/models/shelter.entity';
import { FindZipCodeShelterDto } from './dto/find-zipCode-shelter.dto';
import { Step } from './validators/cor/Step';
import { CnpjExistsUpdate } from './validators/cor/CnpjExistsUpdate.validator';
import { SucessValidate } from './validators/cor/SuccessValidate.validator';
import { EmailExistsUpdate } from './validators/cor/EmailExistsUpdate.validator';
import { Geocoding } from 'src/providers/geocoding';
@Injectable()
export class ShelterService {
  constructor(
    @InjectModel(Shelter.name) private shelterRepository: Model<Shelter>,
    private readonly geocoding: Geocoding,
  ) {}

  async addCordenates(residentDto) {
    const { latitude, longitude } = await this.geocoding.getCoordinates({
      zipcode: residentDto.zipCode,
      address: `${residentDto.address}, ${residentDto.addressNumber}`,
    });

    residentDto.location = {
      coordinates: [],
    };

    residentDto.location.coordinates[0] = longitude;
    residentDto.location.coordinates[1] = latitude;

    return residentDto;
  }

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    if (
      !createShelterDto.location?.coordinates[0] ||
      !createShelterDto.location?.coordinates[1]
    )
      createShelterDto = await this.addCordenates(createShelterDto);

    const createdShelter = new this.shelterRepository(createShelterDto);
    return (await createdShelter.save()).toObject();
  }

  async findByZipCode({ zipCode }: FindZipCodeShelterDto) {
    return this.shelterRepository
      .find({ zipCode: { $in: zipCode } })
      .lean()
      .exec();
  }

  async findByEmail(email: string) {
    const shelter = await this.shelterRepository.findOne({ email });

    if (!shelter) {
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );
    }

    return shelter.toObject();
  }

  async update(id: string, updateShelterDto: UpdateShelterDto) {
    const validate: Step = new CnpjExistsUpdate(
      this.shelterRepository,
      new EmailExistsUpdate(this.shelterRepository, new SucessValidate()),
    );
    await validate.validate(id, updateShelterDto);

    if (
      !updateShelterDto.location?.coordinates[0] ||
      !updateShelterDto.location?.coordinates[1]
    )
      updateShelterDto = await this.addCordenates(updateShelterDto);

    const shelter = await this.shelterRepository.updateOne(
      { _id: id },
      updateShelterDto,
      {
        new: true,
      },
    );

    if (!shelter.matchedCount)
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );

    return (await this.shelterRepository.findOne({ _id: id })).toObject();
  }

  async remove(id: string) {
    const shelter = await this.shelterRepository.findOne({ _id: id });

    if (!shelter)
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );

    await shelter.deleteOne();

    return { message: 'Shelter deleted.' };
  }
}
