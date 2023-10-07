import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  IsNumberString,
  IsBoolean,
  Matches,
  MaxLength,
  IsOptional,
  IsObject,
} from 'class-validator';
import { IsUnique } from '../validators/IsUnique.validator';
import { LocationType } from '../../../../../@types/Coordinates';

export class CreateShelterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name: string;

  @IsNotEmpty()
  @Length(1, 45)
  @IsEmail()
  @IsUnique()
  email: string;

  @IsNotEmpty()
  @Length(18, 18)
  @IsUnique()
  cnpj: string;

  @IsString()
  @Length(2, 2)
  state: string;

  @MaxLength(29)
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 8)
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  addressNumber: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  complement: string;

  @IsObject()
  @IsOptional()
  location?: LocationType;

  @IsNotEmpty()
  @IsNumberString()
  @Length(13, 14)
  @Matches(/^\d{13}$/)
  phone: string;

  isActive?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  terms: boolean;
}
