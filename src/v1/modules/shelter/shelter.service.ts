import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { CreateShelterDto } from "./dto";
import { geocodingProvider } from "../../../provider/geocoding.provider";
import { shelterRepository } from "../../../database/repositories/shelter.repository";
import { Shelter } from "../../../database/entities/shelter.entity";

const addCordenates = async (
	createShelterDto: CreateShelterDto,
): Promise<CreateShelterDto> => {
  try {
    const { latitude, longitude } = await geocodingProvider.getCoordinates({
      address: createShelterDto.address,
      addressNumber: createShelterDto.addressNumber,
      neighborhood: createShelterDto.neighborhood,
    });
  
    createShelterDto.location = {
      coordinates: [],
    };
  
    createShelterDto.location.coordinates[0] = longitude;
    createShelterDto.location.coordinates[1] = latitude;
    createShelterDto.location.type = "Point";
  
    return createShelterDto;
  } catch (error) {
    return createShelterDto;
  }
};

export const shelterService = {
	create: async (createShelterDto: CreateShelterDto) => {
		try {
			if (
				!createShelterDto.location?.coordinates[0] ||
				!createShelterDto.location?.coordinates[1]
			)
			createShelterDto = await addCordenates(createShelterDto);

      const shelter: Shelter = shelterRepository.create(createShelterDto);
      await shelterRepository.save(shelter);
      return {
        statusCode: 201,
        message: "Shelter created successfully",
        timestamp: new Date(),
      }
		} catch (error) {
			throw error;
		}
	},
};
