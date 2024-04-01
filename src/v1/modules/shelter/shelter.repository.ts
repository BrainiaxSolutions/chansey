import { Repository } from "typeorm";
import { typeormDataSource } from "../../../database";
import { Shelter } from "../../../database/entities/shelter.entity";

const repository = typeormDataSource.getRepository(
  "Shelter",
) as Repository<Shelter>;

export const shelterRepository = {
  getRepository: repository,
};
