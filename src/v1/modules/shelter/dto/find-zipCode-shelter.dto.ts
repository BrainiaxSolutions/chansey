import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsPostalCode } from 'class-validator';

export class FindZipCodeShelterDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsPostalCode('BR', { each: true })
  @ApiProperty({ example: ['00000-000'] })
  zipCode: string[];
}
