import { FastifyReply, FastifyRequest } from "fastify";
import { transformCreateShelterDto } from "./dto";
import { shelterService } from "./shelter.service";

export const shelterController = {
	create: async ({ body }: FastifyRequest, reply: FastifyReply) => {
		return reply
			.code(201)
			.send(await shelterService.create(transformCreateShelterDto(body)));
	},
};
