import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { In, Repository } from 'typeorm';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from 'src/v1/database/models/shelter.entity';
import { FindZipCodeShelterDto } from './dto/find-zipCode-shelter.dto';
@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    public readonly shelterRepository: Repository<Shelter>,
  ) {}

  async create(createShelterDto: CreateShelterDto) {
    const shelter: Shelter = plainToClass(Shelter, createShelterDto);
    return this.shelterRepository.save(shelter);
  }

  async findByZipCode({ zipCode }: FindZipCodeShelterDto) {
    return this.shelterRepository.find({
      where: { zipCode: In(zipCode) },
    });
  }

  async findOne(id: string) {
    const shelter: Shelter = await this.shelterRepository.findOne({
      where: { id },
    });

    if (!shelter)
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );

    return shelter;
  }

  async update(id: string, updateShelterDto: UpdateShelterDto) {
    const shelter: Shelter = await this.shelterRepository.findOne({
      where: { id },
    });

    if (!shelter)
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );

    const editedShelter: Shelter = Object.assign(shelter, updateShelterDto);

    return this.shelterRepository.save(editedShelter);
  }

  async remove(id: string) {
    const shelter: Shelter = await this.shelterRepository.findOne({
      where: { id },
    });

    if (!shelter)
      throw new HttpException(
        'Shelter id not exists in database.',
        HttpStatus.NOT_FOUND,
      );

    await this.shelterRepository.delete(id);

    return { message: 'Shelter deleted.' };
  }
}
