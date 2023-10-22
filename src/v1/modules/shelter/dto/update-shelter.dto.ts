import { LocationType } from '../../../../../@types/Coordinates';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateShelterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name: string;

  @IsNotEmpty()
  @Length(1, 45)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(18, 18)
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
}
