import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExceptionDto } from 'src/config/error/exception.dto';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { FindZipCodeShelterDto } from './dto/find-zipCode-shelter.dto';

@Controller('v1/shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  async create(@Body() createShelterDto: CreateShelterDto) {
    try {
      return await this.shelterService.create(createShelterDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    try {
      return await this.shelterService.findByEmail(email);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Post('findByZipCode')
  async findByZipCode(@Body() findZipCodeShelterDto: FindZipCodeShelterDto) {
    try {
      return await this.shelterService.findByZipCode(findZipCodeShelterDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShelterDto: UpdateShelterDto,
  ) {
    try {
      return await this.shelterService.update(id, updateShelterDto);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.shelterService.remove(id);
    } catch (error) {
      throw new ExceptionDto(error);
    }
  }
}
