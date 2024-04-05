import { FastifyReply, FastifyRequest } from "fastify";
import { transformCreateShelterDto, transformUpdateShelterDto } from "./dto";
import { shelterService } from "./shelter.service";

export const shelterController = {
	create: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(201)
			.send(await shelterService.create(await transformCreateShelterDto(body)));
	},
	findByEmail: async ({ params: { email } }, reply: FastifyReply) => {
		return reply.code(200).send(await shelterService.findByEmail(email));
	},
	update: async ({ params: { email }, body }, reply: FastifyReply) => {
		return reply
			.code(200)
			.send(
				await shelterService.update(email, transformUpdateShelterDto(body)),
			);
	},
	remove: async ({ params: { email } }, reply: FastifyReply) => {
		return reply.code(200).send(await shelterService.remove(email));
	},
};
