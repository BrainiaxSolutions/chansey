import { Repository } from "typeorm";
import { httpException } from "../../config/error";
import { isUnique } from "../../config/validators/isUnique.validator";
import * as httpStatus from "http-status";

export const fieldsExistsUpdate = async <T>(
	repository: Repository<T>,
	fieldNames: string[],
	actualData: any,
	data: any,
) => {
	const errorMessages = await Promise.all(
		fieldNames.map(async (fieldName) => {
			if (actualData[fieldName] !== data[fieldName]) {
				if (await isUnique(repository, fieldName, data[fieldName]))
					return `${fieldName}: There is already another account with this ${fieldName}.`;
			}
		}),
	);

	if (errorMessages.some((message) => message !== undefined))
		throw httpException(errorMessages.filter(Boolean), httpStatus.BAD_REQUEST);
};
