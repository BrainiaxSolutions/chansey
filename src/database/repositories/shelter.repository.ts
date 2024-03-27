import { Repository } from "typeorm";
import { typeormDataSource } from "../../database";
import { Shelter } from "../entities/shelter.entity";

export const shelterRepository = typeormDataSource.getRepository(
	"Shelter",
) as Repository<Shelter>;
