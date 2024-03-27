import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { CreateShelterDto } from "./dto";

export const shelterService = {
	create: async (createShelterDto: CreateShelterDto) => {
		try {
			if (!createShelterDto)
				throw httpException("User data was not sent.", HttpStatus.BAD_REQUEST);
			return {
				_id: String(Math.floor(Math.random() * 100)),
				name: createShelterDto.name,
				email: createShelterDto.email,
			};
		} catch (error) {
			throw error;
		}
	},
};
