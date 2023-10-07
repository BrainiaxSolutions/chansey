import { IsArray, ArrayNotEmpty } from 'class-validator';

export class FindZipCodeShelterDto {
  @IsArray()
  @ArrayNotEmpty()
  zipCode: string[];
}
