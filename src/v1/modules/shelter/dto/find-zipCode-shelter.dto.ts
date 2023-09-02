import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty } from 'class-validator';

export class FindZipCodeShelterDto {
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ example: ['00000000'] })
  zipCode: string[];
}
