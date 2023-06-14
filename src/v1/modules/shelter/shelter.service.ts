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
@Injectable()
export class ShelterService {
  constructor(
    @InjectModel(Shelter.name) private shelterRepository: Model<Shelter>,
  ) {}

  async create(createShelterDto: CreateShelterDto): Promise<Shelter> {
    const createdShelter = new this.shelterRepository(createShelterDto);
    return (await createdShelter.save()).toObject();
  }

  async findByZipCode({ zipCode }: FindZipCodeShelterDto) {
    return this.shelterRepository
      .find({ zipCode: { $in: zipCode } })
      .lean()
      .exec();
  }

  async findOne(id: string) {
    const shelter = await this.shelterRepository.findById(id);

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

    const shelter = await this.shelterRepository.updateOne(
      { _id: id },
      updateShelterDto,
      {
        new: true,
      },
    );

    if (!shelter)
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
