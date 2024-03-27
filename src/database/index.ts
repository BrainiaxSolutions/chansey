import { DataSource } from "typeorm";
import { env } from "../config";
import { Shelter } from "./entities/shelter.entity";

export const typeormDataSource = new DataSource({
	type: env.database.name,
	url: env.database.url,
	entities: [Shelter],
	synchronize: true,
	logging: true,
});
