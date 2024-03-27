import { DataSource } from "typeorm";
import { env } from "../config";
import { Shelter } from "./entities/shelter.entity";

export const typeormDataSource = new DataSource({
	type: env.db.name,
	url: env.db.url,
	entities: [Shelter],
	synchronize: true,
	logging: true,
});
