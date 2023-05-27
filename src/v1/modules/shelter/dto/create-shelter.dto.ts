import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  IsNumberString,
  IsBoolean,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateShelterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(1, 45)
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Length(18, 18)
  @ApiProperty()
  cnpj: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty()
  state: string;

  @MaxLength(29)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  @ApiProperty()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  @ApiProperty()
  addressNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(14, 14)
  @ApiProperty()
  @Matches(/^\+\d{13}$/)
  phone: string;

  isActive?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  terms: boolean;
}
