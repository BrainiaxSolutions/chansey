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
  IsOptional,
} from 'class-validator';
import { IsUnique } from '../validators/IsUnique.validator';

export class CreateShelterDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Length(1, 45)
  @IsEmail()
  @IsUnique()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Length(18, 18)
  @IsUnique()
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

  @IsString()
  @Length(3, 12)
  @Matches(/-?(\d{1,3}(\.\d+)?|90(\.0+)?)/)
  @ApiProperty()
  @IsOptional()
  latitude?: string;

  @IsString()
  @Length(3, 12)
  @Matches(/-?(\d{1,3}(\.\d+)?|180(\.0+)?)/)
  @IsOptional()
  @ApiProperty()
  longitude?: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(13, 14)
  @ApiProperty()
  @Matches(/^\d{13}$/)
  phone: string;

  isActive?: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  terms: boolean;
}
