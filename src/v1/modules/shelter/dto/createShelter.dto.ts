import { isUnique } from "../../../../config/validators/isUnique.validator";
import { shelterRepository } from "../shelter.repository";
import { z } from "zod";

const CreateShelterSchema = z.object({
	name: z.string().min(1).max(45),
	email: z
		.string()
		.min(1)
		.max(45)
		.email()
		.refine(
			async (value) => {
				return !(await isUnique(
					shelterRepository.getRepository,
					"email",
					value,
				));
			},
			{
				message: "Field that must be unique is already registered.",
			},
		),
	cnpj: z
		.string()
		.min(18)
		.max(18)
		.refine(
			async (value) => {
				return !(await isUnique(
					shelterRepository.getRepository,
					"cnpj",
					value,
				));
			},
			{
				message: "Field that must be unique is already registered.",
			},
		),
	state: z.string().min(2).max(2),
	city: z.string().max(29),
	zipCode: z.string().min(8).max(8),
	address: z.string().min(1).max(45),
	addressNumber: z.string().min(1).max(4),
	neighborhood: z.string().min(1).max(45),
	complement: z.string().min(1).max(30),
	location: z
		.object({
			coordinates: z.array(z.number()),
			type: z
				.string()
				.optional()
				.transform((val) => {
					return val ? val : "Point";
				}),
		})
		.optional(),
	phone: z
		.string()
		.min(13)
		.max(14)
		.regex(/^\d{13}$/),
	terms: z.boolean(),
});

export type CreateShelterDto = z.infer<typeof CreateShelterSchema>;

export const transformCreateShelterDto = (
	data: any,
): Promise<CreateShelterDto> => {
	return CreateShelterSchema.parseAsync(data);
};
