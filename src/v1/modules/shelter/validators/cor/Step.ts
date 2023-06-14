import { UpdateShelterDto } from '../../dto/update-shelter.dto';

export abstract class Step {
  next: Step;

  constructor(next: Step) {
    this.next = next;
  }

  public abstract validate(
    id: string,
    shelter: UpdateShelterDto,
  ): Promise<void>;
}
