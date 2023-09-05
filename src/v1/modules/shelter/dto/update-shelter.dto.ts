import { ApiProperty } from '@nestjs/swagger';
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
  @Length(8, 8)
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
  @IsString()
  @Length(1, 30)
  @ApiProperty()
  complement: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({
    type: 'object',
    properties: {
      coordinates: {
        type: 'array',
        items: {
          type: 'number',
          example: 0,
        },
        minItems: 2,
      },
    },
  })
  location?: LocationType;

  @IsNotEmpty()
  @IsNumberString()
  @Length(13, 14)
  @ApiProperty()
  @Matches(/^\d{13}$/)
  phone: string;
}
