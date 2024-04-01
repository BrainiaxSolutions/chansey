import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { CreateShelterDto, UpdateShelterDto } from "./dto";
import { geocodingProvider } from "../../../provider/geocoding.provider";
import { shelterRepository } from "./shelter.repository";
import { Shelter } from "../../../database/entities/shelter.entity";
import { utils } from "../../../config/utils";

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

      const shelter: Shelter =
        shelterRepository.getRepository.create(createShelterDto);
      await shelterRepository.getRepository.save(shelter);
      return {
        statusCode: 201,
        message: "Shelter created successfully",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  },
  findByEmail: async (email: string) => {
    try {
      const shelter: Shelter = await shelterRepository.getRepository.findOneBy({
        email,
      });
      if (!shelter)
        throw httpException("Shelter not found.", HttpStatus.NOT_FOUND);

      return utils.filterAttributes(shelter, ["_id", "location"]);
    } catch (error) {
      throw error;
    }
  },
  update: async (email: string, updateShelterDto: UpdateShelterDto) => {
    try {
      const shelter: Shelter = await shelterRepository.getRepository.findOneBy({
        email,
      });

      if (!shelter)
        throw httpException("Shelter not found.", HttpStatus.NOT_FOUND);

      if (
        !updateShelterDto.location?.coordinates[0] ||
        !updateShelterDto.location?.coordinates[1]
      )
        updateShelterDto = await addCordenates(updateShelterDto);

      await shelterRepository.getRepository.update({ email }, updateShelterDto);

      return updateShelterDto;
    } catch (error) {
      throw error;
    }
  },
  remove: async (email: string) => {
    try {
      const shelter: Shelter = await shelterRepository.getRepository.findOneBy({
        email,
      });

      if (!shelter)
        throw httpException("Shelter not found.", HttpStatus.NOT_FOUND);

      await shelterRepository.getRepository.delete(shelter);

      return {
        statusCode: 200,
        message: "Shelter deleted.",
        timestamp: new Date(),
      };
    } catch (error) {
      throw error;
    }
  },
};
