export const shelterSchema = {
	create: {
		body: {
			type: "object",
			properties: {
				name: {
					type: "string",
				},
				email: {
					type: "string",
				},
				cnpj: {
					type: "string",
				},
				state: {
					type: "string",
				},
				city: {
					type: "string",
				},
				zipCode: {
					type: "string",
				},
				address: {
					type: "string",
				},
				addressNumber: {
					type: "string",
				},
				neighborhood: {
					type: "string",
				},
				complement: {
					type: "string",
				},
				location: {
					type: "object",
				},
				phone: {
					type: "string",
				},
				isActive: {
					type: "boolean",
					default: false,
				},
				terms: {
					type: "boolean",
					default: false,
				},
			},
			required: [
				"name",
				"email",
				"cnpj",
				"state",
				"city",
				"zipCode",
				"address",
				"addressNumber",
				"neighborhood",
				"complement",
				"phone",
				"terms",
			],
		},
	},
};
