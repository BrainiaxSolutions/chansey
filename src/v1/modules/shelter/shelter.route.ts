import { shelterController } from "./shelter.controller";
import { shelterSchema } from "./shelter.schema";

const create = {
	method: "POST",
	url: "/v1/shelter",
	schema: {
		tags: ["v1"],
		summary: "Create shelter",
		...shelterSchema.create,
	},
	handler: shelterController.create,
};

export const shelterRouteV1 = [create];
