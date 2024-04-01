export const utils = {
	filterAttributes: <Entity>(
		entity: Entity,
		propertiesToFilter: string[],
	): Partial<Entity> => {
		const filteredEntity = { ...entity };
		propertiesToFilter.forEach((property) => {
			delete filteredEntity[property];
		});
		return filteredEntity;
	},
};
