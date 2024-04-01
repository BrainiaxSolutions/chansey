import { z } from "zod";

const UpdateShelterSchema = z.object({
	name: z.string().min(1).max(45),
	email: z.string().min(1).max(45).email(),
	cnpj: z.string().min(18).max(18),
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
});

export type UpdateShelterDto = z.infer<typeof UpdateShelterSchema>;

export const transformUpdateShelterDto = (data: any): UpdateShelterDto => {
	return UpdateShelterSchema.parse(data);
};
