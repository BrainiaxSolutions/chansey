import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Shelter } from 'src/v1/database/models/shelter.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Shelter.name) private shelterRepository: Model<Shelter>,
  ) {}

  async validate(value: any, args: any): Promise<boolean> {
    const [field] = args.constraints;

    const fieldExist = await this.shelterRepository.find({
      [field]: value,
    });

    return !fieldExist;
  }

  defaultMessage(args: any): string {
    const [field, validationOptions] = args.constraints;
    return validationOptions?.message
      ? validationOptions.message
      : `${field} must be unique`;
  }
}

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName, validationOptions],
      validator: IsUniqueConstraint,
    });
  };
}
