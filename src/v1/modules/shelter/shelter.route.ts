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

const findByEmail = {
	method: "GET",
	url: "/v1/shelter/:email",
	schema: {
		tags: ["v1"],
		summary: "Find shelter by email",
		...shelterSchema.findByEmail,
	},
	handler: shelterController.findByEmail,
};

const update = {
	method: "PATCH",
	url: "/v1/shelter/:email",
	schema: {
		tags: ["v1"],
		summary: "Update shelter",
		...shelterSchema.update,
	},
	handler: shelterController.update,
};

const remove = {
	method: "DELETE",
	url: "/v1/shelter/:email",
	schema: {
		tags: ["v1"],
		summary: "Delete shelter by email",
		...shelterSchema.remove,
	},
	handler: shelterController.remove,
};

export const shelterRouteV1 = [create, findByEmail, update, remove];
