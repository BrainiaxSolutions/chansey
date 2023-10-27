import { HttpStatus, HttpException } from '@nestjs/common';
import { Shelter } from '../../../../database/models/shelter.entity';
import { Step } from './Step';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateShelterDto } from '../../dto/update-shelter.dto';

export class CnpjExistsUpdate extends Step {
  constructor(
    @InjectModel(Shelter.name) private shelterRepository: Model<Shelter>,
    next: Step,
  ) {
    super(next);
  }

  async validate(
    id: string,
    shelter: Shelter | UpdateShelterDto,
  ): Promise<void> {
    const shelterExists: Shelter = await this.shelterRepository.findOne({
      cnpj: shelter.cnpj,
      _id: { $ne: id },
    });

    if (!!shelterExists) {
      throw new HttpException(
        'There is already a shelter registered with this CNPJ.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.next.validate(id, shelter);
  }
}
